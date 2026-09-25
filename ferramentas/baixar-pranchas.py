"""Baixa do Wikimedia Commons as imagens das pranchas e gera os créditos.

Só aceita arquivo com licença livre (domínio público ou CC0/CC BY/CC BY-SA).
Converte tudo para tons de cinza e WebP — o tom de tinta sobre papel é aplicado
depois, pelo CSS, então a imagem guardada aqui é a original em cinza.

Uso:
    python ferramentas\\baixar-pranchas.py            # baixa o que falta
    python ferramentas\\baixar-pranchas.py --refazer     # baixa tudo de novo
    python ferramentas\\baixar-pranchas.py --miniaturas  # só refaz as miniaturas da capa
"""

from __future__ import annotations

import argparse
import io
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "public" / "img" / "pranchas"
MINIATURAS = RAIZ / "public" / "img" / "miniaturas"
CREDITOS = RAIZ / "CREDITOS.md"

API = "https://commons.wikimedia.org/w/api.php"
AGENTE = "SociedadeRealQuiz/1.0 (projeto pessoal; felipe.melo9178@gmail.com)"

LARGURA = 640  # largura final da prancha, em pixels
TETO_BYTES = 110 * 1024  # peso maximo de cada prancha

# Miniatura da fita da capa: já recortada em 3:4 e já tingida de tinta sobre
# papel. Assim o navegador não precisa de filtro nem de modo de mistura para
# desenhar 60 imagens andando — é isso que pesa num celular fraco.
MINIATURA = (240, 320)
PAPEL = (248, 243, 233)  # o --papel-alto do CSS

# Licenças aceitas. Qualquer coisa fora disso é descartada, mesmo que a imagem
# seja a ideal — imagem sem licença clara não entra no projeto.
LICENCAS_OK = (
    "public domain",
    "pd-",
    "cc0",
    "cc by",
    "cc-by",
)

# chave da prancha -> busca no Commons (a primeira imagem livre encontrada vence)
BUSCAS: dict[str, str] = {
    "darwin": 'intitle:"Charles Darwin" portrait photograph',
    "beagle": 'intitle:beagle straits magellan',
    "tentilhoes": 'intitle:finches Darwin Gould journal researches',
    "origem": 'intitle:"Origin of Species" title page',
    "wallace": 'intitle:"Alfred Russel Wallace" portrait',
    "huxley": 'intitle:"Thomas Henry Huxley" portrait',
    "newton": 'intitle:"Isaac Newton" Kneller',
    "principia": 'intitle:Principia Newton title page',
    "faraday": 'intitle:"Michael Faraday" Phillips oil painting',
    "davy": 'intitle:"Humphry Davy" portrait',
    "micrographia": 'intitle:Micrographia flea Hooke',
    "halley": 'intitle:"Edmond Halley" portrait',
    "herschel": 'intitle:"William Herschel" astronomer engraving',
    "anning": 'intitle:"Mary Anning" portrait painting',
    "harvey": 'intitle:"William Harvey" engraving physician',
    "jenner": 'intitle:"Edward Jenner" portrait',
    "dalton": 'intitle:"John Dalton" portrait chemist',
    "nightingale": 'intitle:"Florence Nightingale" portrait',
    "pombos": 'intitle:pigeons Darwin variation animals plants',
    "owen": 'intitle:"Richard Owen" portrait naturalist',
    "colera": 'intitle:"Snow" cholera map Broad Street 1854',
    "lister": 'intitle:"Joseph Lister" portrait surgeon',
    "drosera": 'intitle:Drosera rotundifolia botanical plate',
    "mendeleev": 'intitle:"Dmitri Mendeleev" portrait',
    "priestley": 'intitle:"Joseph Priestley" portrait chemist',
    "coracao": 'intitle:Gray heart anatomy 1858 plate',
    "abelha": 'intitle:Bombus plate',
    "chimpanze": 'intitle:chimpanzee Darwin expression emotions',
}


def buscar(consulta: str) -> list[dict]:
    parametros = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrsearch": consulta,
        "gsrnamespace": "6",
        "gsrlimit": "12",
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|size|mime",
        "iiurlwidth": str(LARGURA),
    }
    url = f"{API}?{urllib.parse.urlencode(parametros)}"
    pedido = urllib.request.Request(url, headers={"User-Agent": AGENTE})
    with urllib.request.urlopen(pedido, timeout=30) as resposta:
        dados = json.load(resposta)
    paginas = dados.get("query", {}).get("pages", {})
    # a API devolve fora de ordem; `index` guarda a ordem do buscador
    return sorted(paginas.values(), key=lambda p: p.get("index", 99))


def limpar_html(texto: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", texto or "")).strip()


def licenca_livre(meta: dict) -> str | None:
    nome = limpar_html(meta.get("LicenseShortName", {}).get("value", ""))
    if not nome:
        return None
    if any(termo in nome.lower() for termo in LICENCAS_OK):
        return nome
    return None


def escolher(paginas: list[dict]) -> tuple[dict, dict, str] | None:
    for pagina in paginas:
        info = (pagina.get("imageinfo") or [{}])[0]
        if not info.get("thumburl"):
            continue
        if info.get("mime", "") not in ("image/jpeg", "image/png", "image/tiff"):
            continue
        if min(info.get("width", 0), info.get("height", 0)) < 320:
            continue
        meta = info.get("extmetadata", {})
        nome_licenca = licenca_livre(meta)
        if nome_licenca:
            return pagina, info, nome_licenca
    return None


def baixar_imagem(url: str) -> Image.Image:
    pedido = urllib.request.Request(url, headers={"User-Agent": AGENTE})
    with urllib.request.urlopen(pedido, timeout=60) as resposta:
        bruto = resposta.read()
    return Image.open(io.BytesIO(bruto))


def salvar(imagem: Image.Image, caminho: Path) -> int:
    """Grava em cinza e WebP, apertando a qualidade até caber no teto de peso.

    Gravura e retrato antigo têm textura demais: a 640 px e qualidade 82,
    alguns passavam de 200 KB sozinhos. Como a prancha é exibida com uns
    300 px de largura, apertar não aparece na tela — só na conta da página.
    """
    imagem = imagem.convert("L")
    if imagem.width > LARGURA:
        altura = round(imagem.height * LARGURA / imagem.width)
        imagem = imagem.resize((LARGURA, altura), Image.LANCZOS)

    for qualidade in (82, 74, 66, 58, 50):
        imagem.save(caminho, "WEBP", quality=qualidade, method=6)
        if caminho.stat().st_size <= TETO_BYTES:
            break
    return caminho.stat().st_size


def gerar_miniatura(origem: Path, destino: Path) -> int:
    imagem = Image.open(origem).convert("L")
    largura, altura = MINIATURA
    # recorte 3:4 ancorado em cima, como o `object-position: top` fazia no CSS
    escala = max(largura / imagem.width, altura / imagem.height)
    imagem = imagem.resize(
        (round(imagem.width * escala), round(imagem.height * escala)), Image.LANCZOS
    )
    esquerda = (imagem.width - largura) // 2
    imagem = imagem.crop((esquerda, 0, esquerda + largura, altura))
    # contraste leve e "multiplicar" sobre o papel: o mesmo efeito do CSS antigo
    imagem = imagem.point(lambda v: max(0, min(255, round((v - 128) * 1.06 + 128))))
    canais = [imagem.point(lambda v, c=c: round(c * v / 255)) for c in PAPEL]
    Image.merge("RGB", canais).save(destino, "WEBP", quality=72, method=6)
    return destino.stat().st_size


def gerar_miniaturas() -> None:
    MINIATURAS.mkdir(parents=True, exist_ok=True)
    total = 0
    for origem in sorted(DESTINO.glob("*.webp")):
        total += gerar_miniatura(origem, MINIATURAS / origem.name)
    sobras = {m.name for m in MINIATURAS.glob("*.webp")} - {o.name for o in DESTINO.glob("*.webp")}
    for nome in sobras:
        (MINIATURAS / nome).unlink()
    print(f"miniaturas: {len(list(MINIATURAS.glob('*.webp')))} arquivos, {total // 1024} KB")


def main() -> int:
    analisador = argparse.ArgumentParser(description=__doc__)
    analisador.add_argument("--refazer", action="store_true", help="baixa tudo de novo")
    analisador.add_argument(
        "--miniaturas", action="store_true", help="só refaz as miniaturas da capa, sem baixar"
    )
    argumentos = analisador.parse_args()

    if argumentos.miniaturas:
        gerar_miniaturas()
        return 0

    DESTINO.mkdir(parents=True, exist_ok=True)
    creditos: list[dict] = []
    falhas: list[str] = []

    for chave, consulta in BUSCAS.items():
        arquivo = DESTINO / f"{chave}.webp"
        if arquivo.exists() and not argumentos.refazer:
            print(f"  ja existe  {chave}")
            continue

        print(f"  buscando   {chave} ...", end=" ", flush=True)
        try:
            escolha = escolher(buscar(consulta))
        except Exception as erro:  # rede, JSON, o que for
            print(f"ERRO ({erro})")
            falhas.append(chave)
            continue

        if not escolha:
            print("nenhuma imagem livre encontrada")
            falhas.append(chave)
            continue

        pagina, info, nome_licenca = escolha
        try:
            tamanho = salvar(baixar_imagem(info["thumburl"]), arquivo)
        except Exception as erro:
            print(f"ERRO ao baixar ({erro})")
            falhas.append(chave)
            continue

        meta = info.get("extmetadata", {})
        creditos.append(
            {
                "chave": chave,
                "titulo": pagina["title"].removeprefix("File:"),
                "autor": limpar_html(meta.get("Artist", {}).get("value", "")) or "desconhecido",
                "licenca": nome_licenca,
                "pagina": info.get("descriptionurl", ""),
            }
        )
        print(f"ok ({tamanho // 1024} KB)")

    if creditos:
        escrever_creditos(creditos)
    gerar_miniaturas()

    if falhas:
        print("\nFaltou: " + ", ".join(falhas))
        return 1
    print("\nTodas as pranchas baixadas.")
    return 0


def escrever_creditos(novos: list[dict]) -> None:
    antigos: dict[str, dict] = {}
    if CREDITOS.exists():
        for linha in CREDITOS.read_text(encoding="utf-8").splitlines():
            if linha.startswith("| `"):
                partes = [p.strip() for p in linha.strip("|").split("|")]
                if len(partes) >= 5:
                    antigos[partes[0].strip("`")] = {
                        "chave": partes[0].strip("`"),
                        "titulo": partes[1],
                        "autor": partes[2],
                        "licenca": partes[3],
                        "pagina": partes[4].strip("<>"),
                    }
    for item in novos:
        antigos[item["chave"]] = item

    linhas = [
        "# Créditos das imagens",
        "",
        "Todas as pranchas vêm do Wikimedia Commons e estão em domínio público ou",
        "sob licença livre. As imagens foram convertidas para tons de cinza e para",
        "o formato WebP; o tom de tinta sobre papel é aplicado pelo CSS, na hora de",
        "exibir. Nenhuma foi recortada de forma a mudar o conteúdo.",
        "",
        "Gerado por `ferramentas/baixar-pranchas.py` — não editar à mão.",
        "",
        "| Prancha | Arquivo no Commons | Autoria | Licença | Página |",
        "|---|---|---|---|---|",
    ]
    for chave in sorted(antigos):
        item = antigos[chave]
        linhas.append(
            f"| `{item['chave']}` | {item['titulo']} | {item['autor']} | "
            f"{item['licenca']} | <{item['pagina']}> |"
        )
    linhas.append("")
    linhas.append("As pranchas desenhadas (diagramas em SVG, dentro do próprio HTML) são")
    linhas.append("originais do projeto e não vêm do Commons.")
    linhas.append("")
    CREDITOS.write_text("\n".join(linhas), encoding="utf-8")


if __name__ == "__main__":
    sys.exit(main())
