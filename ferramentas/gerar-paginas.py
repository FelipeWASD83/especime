"""Gera as páginas fixas do Espécime e o rodapé que todas compartilham.

O que sai daqui:
    public/privacidade/index.html   política de privacidade (LGPD)
    public/termos/index.html        termos de uso
    public/creditos/index.html      créditos das imagens e das fontes
    public/404.html                 página de erro
    public/robots.txt               e, se o endereço estiver definido,
    public/sitemap.xml              o mapa do site
    o rodapé de public/index.html   (entre as marcas <!-- rodape:... -->)
    o endereço em public/index.html (entre as marcas <!-- endereco:... -->)
    os números da capa ("60 perguntas · 37 pranchas")

Contato, nome e data de atualização ficam nas constantes logo abaixo: mudou
um telefone, muda aqui e roda de novo — o rodapé de todas as páginas acompanha.

Uso:
    python ferramentas\\gerar-paginas.py
    python ferramentas\\gerar-paginas.py --endereco https://especime.exemplo.workers.dev

O endereço fica guardado em ferramentas/site.json; depois de definido uma vez,
basta rodar sem argumento.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PUBLICO = RAIZ / "public"
CONFIG = Path(__file__).resolve().parent / "site.json"

NOME = "Espécime"
SUBTITULO = "um quiz de ciência"
ATUALIZADO = "25 de setembro de 2026"

CONTATO = {
    "email": "felipe.sites0@gmail.com",
    "whatsapp": "5531984465713",
    "telefone": "(31) 98446-5713",
    "instagram": "felipesites",
    "instagram_pessoal": "felipe.wasd",
    "site": "https://felipesites.com.br",
}

LICENCAS = {
    "cc by 4.0": ("CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/deed.pt-br"),
    "cc by-sa 4.0": ("CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br"),
    "cc0": ("CC0 (domínio público)", "https://creativecommons.org/publicdomain/zero/1.0/deed.pt-br"),
    "public domain": ("Domínio público", ""),
}

# O campo de autoria do Commons às vezes traz quem subiu o arquivo, não quem fez
# a obra. Aqui fica a correção para a página de créditos.
AUTORIA_CORRIGIDA = {
    "principia": "Isaac Newton; impressão de Joseph Streater, Londres, 1687",
}

e = html.escape


# ─────────────────────────────── dados do site ────────────────────────────


def dados_do_site() -> dict:
    """Lê as pranchas e o banco de perguntas direto dos módulos JS, pelo Node."""
    script = (
        "Promise.all([import('./public/js/dados/pranchas.js'),"
        "import('./public/js/dados/perguntas.js')]).then(([a,b])=>"
        "console.log(JSON.stringify({pranchas:a.PRANCHAS,perguntas:b.PERGUNTAS.length})))"
    )
    saida = subprocess.run(
        ["node", "--input-type=module", "-e", script],
        cwd=RAIZ, capture_output=True, text=True, encoding="utf-8", check=True,
    ).stdout
    return json.loads(saida)


def creditos_do_commons() -> dict[str, dict]:
    linhas = (RAIZ / "CREDITOS.md").read_text(encoding="utf-8").splitlines()
    registro = {}
    for linha in linhas:
        if not linha.startswith("| `"):
            continue
        partes = [p.strip() for p in linha.strip().strip("|").split("|")]
        chave = partes[0].strip("`")
        registro[chave] = {
            "arquivo": html.unescape(partes[1]),
            "autor": html.unescape(partes[2]),
            "licenca": partes[3],
            "pagina": partes[4].strip("<>"),
        }
    return registro


# ──────────────────────────────── peças comuns ────────────────────────────


def cabeca(titulo: str, descricao: str, *, indexar: bool = True) -> str:
    robots = "" if indexar else '<meta name="robots" content="noindex">\n'
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(titulo)}</title>
<meta name="description" content="{e(descricao)}">
{robots}<meta name="theme-color" content="#f2ece0">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fontes/cormorant-garamond.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/estilo.css">
</head>

<body>

<a class="marca-canto" href="{CONTATO['site']}" target="_blank" rel="noopener">
  <span class="marca-canto__risco" aria-hidden="true"></span>
  Feito por Felipe&nbsp;Sites
</a>
"""


def rodape() -> str:
    c = CONTATO
    zap = f"https://wa.me/{c['whatsapp']}?text=" + "Ol%C3%A1!%20Vi%20o%20Esp%C3%A9cime%20e%20quero%20um%20site."
    return f"""<!-- rodape:inicio — gerado por ferramentas/gerar-paginas.py; não editar à mão -->
<footer class="bloco bloco--tinta rodape" id="rodape">
  <div class="limite rodape__grade">
    <div class="rodape__oferta">
      <p class="rotulo">Quem fez este site</p>
      <h2 class="rodape__titulo">Gostou? Eu faço sites assim <em>para o seu negócio.</em></h2>
      <p class="rodape__texto">
        Sites rápidos, bonitos e feitos à mão — sem modelo pronto, sem mensalidade
        de plataforma. Do jeito que este aqui foi feito.
      </p>
      <div class="rodape__acoes">
        <a class="botao botao--claro" href="{zap}" target="_blank" rel="noopener">
          Chamar no WhatsApp
          <span class="botao__seta" aria-hidden="true">→</span>
        </a>
        <a class="botao botao--contorno-claro" href="{c['site']}" target="_blank" rel="noopener">Ver o Felipe Sites</a>
      </div>
    </div>

    <div class="rodape__contato">
      <p class="rotulo">Felipe Sites</p>
      <ul class="rodape__lista">
        <li><span class="rodape__tipo">E-mail</span><a href="mailto:{c['email']}">{c['email']}</a></li>
        <li><span class="rodape__tipo">WhatsApp</span><a href="{zap}" target="_blank" rel="noopener">{c['telefone']}</a></li>
        <li><span class="rodape__tipo">Instagram</span><a href="https://www.instagram.com/{c['instagram']}/" target="_blank" rel="noopener">@{c['instagram']}</a></li>
      </ul>
      <p class="rotulo">Quem escreveu o quiz</p>
      <ul class="rodape__lista">
        <li><span class="rodape__tipo">Felipe</span><a href="https://www.instagram.com/{c['instagram_pessoal']}/" target="_blank" rel="noopener">@{c['instagram_pessoal']}</a></li>
      </ul>
    </div>
  </div>

  <div class="limite rodape__base">
    <p>{NOME} · {SUBTITULO} · feito por <a href="{c['site']}" target="_blank" rel="noopener">Felipe Sites</a></p>
    <nav class="rodape__legal" aria-label="Informações legais">
      <a href="/privacidade/">Privacidade</a>
      <a href="/termos/">Termos de uso</a>
      <a href="/creditos/">Créditos das imagens</a>
    </nav>
  </div>
</footer>
<!-- rodape:fim -->"""


def documento(slug: str, rotulo: str, titulo: str, descricao: str, corpo: str) -> str:
    return (
        cabeca(f"{titulo} — {NOME}", descricao)
        + f"""
<main>
  <article class="bloco bloco--papel documento">
    <div class="limite limite--texto">
      <a class="documento__voltar" href="/"><span aria-hidden="true">←</span> {NOME}</a>
      <p class="rotulo">{e(rotulo)}</p>
      <h1 class="documento__titulo">{e(titulo)}</h1>
      <p class="documento__data">Atualizado em {ATUALIZADO}.</p>
{corpo}
    </div>
  </article>
</main>

{rodape()}

</body>
</html>
"""
    )


# ────────────────────────────────── páginas ───────────────────────────────


def pagina_privacidade() -> str:
    c = CONTATO
    corpo = f"""
      <p class="documento__lide">
        A versão curta: <strong>este site não coleta, não guarda e não envia nenhum
        dado seu.</strong> Não tem cadastro, formulário, cookie, anúncio nem
        ferramenta de análise. O resto desta página explica isso em detalhe, como
        pede a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <h2>Quem é o responsável</h2>
      <p>
        O {NOME} é um projeto de Felipe, do Felipe Sites. Qualquer dúvida sobre
        privacidade vai para <a href="mailto:{c['email']}">{c['email']}</a>.
      </p>

      <h2>O que acontece quando você joga</h2>
      <p>
        As perguntas sorteadas e as suas respostas ficam só na memória do seu
        navegador, enquanto a página está aberta. Nada disso é enviado a lugar
        nenhum. Ao fechar ou atualizar a página, tudo some — por isso o quiz
        recomeça do zero.
      </p>
      <p>
        O botão <em>Copiar meu resultado</em> coloca um texto curto na área de
        transferência do seu aparelho. Ele não é enviado: só vai para onde você
        colar.
      </p>

      <h2>Cookies e armazenamento</h2>
      <p>
        O site não cria cookies e não usa o armazenamento local do navegador.
        Também não carrega nada de outros servidores: as fontes e as imagens
        estão todas hospedadas aqui mesmo. Por isso não aparece aviso de cookies
        — não há o que avisar.
      </p>

      <h2>Hospedagem</h2>
      <p>
        O site é servido pela Cloudflare. Como acontece com qualquer site na
        internet, o servidor recebe dados técnicos da conexão — endereço IP, tipo
        de navegador e endereço da página pedida — para conseguir entregar a
        página e proteger o site contra ataques. A Cloudflare trata esses dados
        conforme a
        <a href="https://www.cloudflare.com/pt-br/privacypolicy/" target="_blank" rel="noopener">política de privacidade dela</a>,
        e pode, em situações de proteção contra robôs, usar um cookie de
        segurança estritamente necessário. O {NOME} não tem ferramenta própria de
        registro ou de análise de visitas.
      </p>

      <h2>Links para outros sites</h2>
      <p>
        O rodapé leva ao WhatsApp, ao Instagram e ao site do Felipe Sites, e a
        página de créditos leva ao Wikimedia Commons. Ao sair daqui, vale a
        política de privacidade de cada um desses serviços.
      </p>

      <h2>Crianças e adolescentes</h2>
      <p>
        Como o site não coleta dado nenhum, ele pode ser usado por qualquer
        idade, inclusive em sala de aula.
      </p>

      <h2>Os seus direitos</h2>
      <p>
        A LGPD garante, entre outros, o direito de saber quais dados seus são
        tratados, de corrigi-los e de pedir que sejam apagados. Como o {NOME} não
        guarda dado pessoal nenhum, não há registro seu para consultar ou apagar
        — mas qualquer pedido ou dúvida pode ser mandado para
        <a href="mailto:{c['email']}">{c['email']}</a>, e a resposta vem em até
        15 dias.
      </p>

      <h2>Mudanças nesta política</h2>
      <p>
        Se o site passar a tratar algum dado — por exemplo, se ganhar um placar
        público —, esta página muda antes, e a data lá em cima acompanha.
      </p>"""
    return documento(
        "privacidade", "Privacidade", "Política de privacidade",
        f"Como o {NOME} trata os seus dados: não coleta, não guarda e não envia nada.",
        corpo,
    )


def pagina_termos() -> str:
    c = CONTATO
    corpo = f"""
      <p class="documento__lide">
        O {NOME} é um quiz gratuito de biologia, química e física. Usar o site
        significa concordar com estes termos — que são curtos, porque não há
        conta, pagamento nem dado pessoal envolvido.
      </p>

      <h2>O que é o site</h2>
      <p>
        Um quiz educativo, feito por Felipe, do Felipe Sites. Ele também serve de
        demonstração do trabalho do Felipe Sites, por isso o rodapé mostra como
        contratar um site.
      </p>

      <h2>Sobre o conteúdo</h2>
      <p>
        As perguntas e as explicações foram escritas com cuidado e conferidas,
        mas podem conter erro. O quiz é uma forma divertida de conhecer o assunto,
        não um material didático oficial nem uma fonte para citação. Achou algum
        erro? Manda para <a href="mailto:{c['email']}">{c['email']}</a> — a
        correção entra no site.
      </p>

      <h2>O que pode e o que não pode</h2>
      <p>
        Pode jogar quantas vezes quiser, compartilhar o link, mostrar numa aula
        e publicar o seu resultado onde quiser. Não pode copiar o site para
        apresentá-lo como trabalho seu, nem usá-lo para enganar alguém.
      </p>

      <h2>Autoria</h2>
      <p>
        Os textos, o design, os diagramas e o código são do Felipe Sites. Os
        retratos, gravuras e mapas antigos vêm do Wikimedia Commons, cada um sob
        a sua licença, e as fontes são livres; tudo isso está listado nos
        <a href="/creditos/">créditos</a>.
      </p>

      <h2>Disponibilidade</h2>
      <p>
        O site é oferecido como está, sem garantia de que fique sempre no ar ou
        sem erro. Ele pode mudar, ganhar ou perder perguntas a qualquer momento.
      </p>

      <h2>Privacidade</h2>
      <p>
        O que acontece com os seus dados está na
        <a href="/privacidade/">política de privacidade</a>. Em resumo: nada é
        coletado.
      </p>

      <h2>Lei e foro</h2>
      <p>
        Estes termos seguem a lei brasileira. Qualquer questão sobre eles fica
        no foro da comarca de Belo Horizonte, Minas Gerais.
      </p>"""
    return documento(
        "termos", "Termos", "Termos de uso",
        f"As regras para usar o {NOME}: gratuito, sem conta e sem coleta de dados.",
        corpo,
    )


def pagina_creditos(dados: dict) -> str:
    registro = creditos_do_commons()
    fotos = sorted(
        ((k, p) for k, p in dados["pranchas"].items() if p["tipo"] == "foto"),
        key=lambda kv: kv[1]["nome"].lower(),
    )
    desenhos = sorted(
        (p["nome"] for p in dados["pranchas"].values() if p["tipo"] == "desenho"),
        key=str.lower,
    )

    itens = []
    for chave, prancha in fotos:
        info = registro[chave]  # se faltar, o gerador para: crédito é obrigatório
        autor = AUTORIA_CORRIGIDA.get(chave) or info["autor"]
        if autor.lower() in ("desconhecido", "anonymous", "unknown author", ""):
            autor = "Autoria desconhecida"
        nome_licenca, url_licenca = LICENCAS.get(
            info["licenca"].lower(), (info["licenca"], "")
        )
        licenca = (
            f'<a href="{url_licenca}" target="_blank" rel="noopener">{e(nome_licenca)}</a>'
            if url_licenca else e(nome_licenca)
        )
        itens.append(f"""        <li class="credito">
          <img class="credito__miniatura" src="/img/miniaturas/{e(prancha['arquivo'])}" alt="" width="60" height="80" loading="lazy" decoding="async">
          <div>
            <strong>{e(prancha['nome'])}</strong>
            <span>{e(autor)} · {licenca}</span>
            <a href="{e(info['pagina'])}" target="_blank" rel="noopener">{e(info['arquivo'])}</a>
          </div>
        </li>""")

    corpo = f"""
      <p class="documento__lide">
        Os {len(fotos)} retratos, gravuras e mapas do {NOME} vêm do
        <a href="https://commons.wikimedia.org" target="_blank" rel="noopener">Wikimedia Commons</a>
        e estão em domínio público ou sob licença livre. Muitos são do acervo da
        <a href="https://wellcomecollection.org" target="_blank" rel="noopener">Wellcome Collection</a>,
        que liberou as imagens sob CC BY 4.0.
      </p>
      <p>
        <strong>O que foi alterado:</strong> todas as imagens foram convertidas
        para tons de cinza, redimensionadas e comprimidas; as miniaturas da capa
        também foram recortadas e tingidas no tom do papel. Nenhuma alteração
        muda o que a imagem mostra.
      </p>

      <h2>As imagens</h2>
      <ul class="creditos">
{chr(10).join(itens)}
      </ul>

      <h2>Os diagramas</h2>
      <p>
        {len(desenhos)} pranchas foram desenhadas para o próprio {NOME}, porque não
        existe imagem livre confiável do assunto ou porque o conceito se explica
        melhor desenhado: {e(", ".join(desenhos))}.
      </p>

      <h2>As fontes</h2>
      <p>
        Cormorant Garamond (do Cormorant Project), Inter (de Rasmus Andersson) e
        IBM Plex Mono (da IBM), todas sob a SIL Open Font License 1.1. O texto
        completo das licenças está em
        <a href="/fontes/LICENCA-OFL.txt">LICENCA-OFL.txt</a>.
      </p>"""
    return documento(
        "creditos", "Créditos", "Créditos das imagens",
        f"De onde vêm as imagens e as fontes do {NOME}, com autoria e licença de cada uma.",
        corpo,
    )


def pagina_404() -> str:
    return (
        cabeca(f"Página não encontrada — {NOME}", "Esta página não existe.", indexar=False)
        + f"""
<main>
  <section class="bloco bloco--papel hero hero--erro">
    <div class="hero__grade">
      <p class="rotulo hero__rotulo">Erro 404</p>
      <h1 class="hero__titulo">
        <span class="hero__linha">Não catalogado</span>
      </h1>
      <p class="hero__chamada">
        Esta página não consta no acervo. Nem tudo que se procura numa falésia
        acaba virando fóssil — pergunte a Mary Anning.
      </p>
      <div class="hero__acao">
        <a class="botao botao--principal" href="/">
          Voltar para o quiz
          <span class="botao__seta" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</main>

{rodape()}

</body>
</html>
"""
    )


# ───────────────────────── rodapé e endereço na capa ──────────────────────


def trocar_trecho(texto: str, marca: str, novo: str) -> str:
    padrao = re.compile(rf"<!-- {marca}:inicio.*?<!-- {marca}:fim -->", re.S)
    if not padrao.search(texto):
        sys.exit(f"Não achei as marcas <!-- {marca}:inicio --> e <!-- {marca}:fim --> no index.html")
    return padrao.sub(lambda _: novo, texto, count=1)


def bloco_endereco(endereco: str) -> str:
    if not endereco:
        return ("<!-- endereco:inicio — sem endereço definido ainda; rode "
                "ferramentas/gerar-paginas.py --endereco <url> -->\n<!-- endereco:fim -->")
    return f"""<!-- endereco:inicio — gerado por ferramentas/gerar-paginas.py -->
<link rel="canonical" href="{endereco}/">
<meta property="og:url" content="{endereco}/">
<meta property="og:image" content="{endereco}/img/compartilhar.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{NOME} — {SUBTITULO}">
<meta name="twitter:card" content="summary_large_image">
<!-- endereco:fim -->"""


def escrever_numeros(texto: str, dados: dict) -> str:
    """Os números da capa vêm dos dados. Ficam escritos no HTML, e não
    calculados pelo navegador, para a capa não depender do banco de perguntas —
    que só baixa depois que ela aparece."""
    perguntas = dados["perguntas"]
    pranchas = len(dados["pranchas"])
    texto, n1 = re.subn(
        r'(<p class="rotulo hero__pe">)[^<]*(</p>)',
        rf"\g<1>{perguntas} perguntas · {pranchas} pranchas\g<2>", texto,
    )
    texto, n2 = re.subn(
        r'(<span id="conta-pranchas">)[^<]*(</span>)', rf"\g<1>{pranchas}\g<2>", texto,
    )
    if n1 != 1 or n2 != 1:
        sys.exit("Não achei onde escrever os números na capa (hero__pe e conta-pranchas).")
    return texto


def robots(endereco: str) -> str:
    linhas = ["User-agent: *", "Allow: /"]
    if endereco:
        linhas += ["", f"Sitemap: {endereco}/sitemap.xml"]
    return "\n".join(linhas) + "\n"


def sitemap(endereco: str) -> str:
    urls = "".join(
        f"  <url><loc>{endereco}{caminho}</loc></url>\n"
        for caminho in ("/", "/privacidade/", "/termos/", "/creditos/")
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}</urlset>\n"
    )


# ────────────────────────────────── principal ─────────────────────────────


def gravar(caminho: Path, conteudo: str) -> None:
    caminho.parent.mkdir(parents=True, exist_ok=True)
    caminho.write_text(conteudo, encoding="utf-8", newline="\n")
    print(f"  {caminho.relative_to(RAIZ)}")


def main() -> int:
    analisador = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    analisador.add_argument("--endereco", help="endereço público do site, sem barra no fim")
    argumentos = analisador.parse_args()

    config = json.loads(CONFIG.read_text(encoding="utf-8")) if CONFIG.exists() else {}
    if argumentos.endereco is not None:
        config["endereco"] = argumentos.endereco.rstrip("/")
        CONFIG.write_text(json.dumps(config, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    endereco = config.get("endereco", "")

    dados = dados_do_site()
    print("gerando:")
    gravar(PUBLICO / "privacidade" / "index.html", pagina_privacidade())
    gravar(PUBLICO / "termos" / "index.html", pagina_termos())
    gravar(PUBLICO / "creditos" / "index.html", pagina_creditos(dados))
    gravar(PUBLICO / "404.html", pagina_404())
    gravar(PUBLICO / "robots.txt", robots(endereco))
    mapa = PUBLICO / "sitemap.xml"
    if endereco:
        gravar(mapa, sitemap(endereco))
    elif mapa.exists():
        mapa.unlink()

    capa = PUBLICO / "index.html"
    texto = capa.read_text(encoding="utf-8")
    texto = trocar_trecho(texto, "rodape", rodape())
    texto = trocar_trecho(texto, "endereco", bloco_endereco(endereco))
    texto = escrever_numeros(texto, dados)
    gravar(capa, texto)

    print(f"\nendereço: {endereco or '(não definido — a prévia de compartilhamento fica sem imagem)'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
