"""Gera a folha A4 de divulgação com o QR code do Espécime.

Saem dois arquivos em impressao/, sempre substituindo os anteriores:
    especime-qrcode-a4.png   A4 em 300 DPI (2480 x 3508 px), fundo branco puro
    especime-qrcode-a4.pdf   A4 vetorial — o melhor para mandar imprimir

O endereço vem de ferramentas/site.json (o mesmo do gerar-paginas.py). As
fontes vêm do próprio site, então o servidor da porta 4318 precisa estar no
ar. A folha é montada no Edge sem janela, pelo capturador da biblioteca visual
da pasta.

Precisa do pacote segno (gerador de QR em Python puro):
    python -m pip install --user segno

Uso:
    python ferramentas\\gerar-qrcode.py
"""
import base64, importlib.util, json, pathlib, time

import segno

RAIZ = pathlib.Path(__file__).resolve().parent.parent
URL = json.loads((RAIZ / "ferramentas" / "site.json").read_text(encoding="utf-8"))["endereco"]
TEXTO_LINK = URL.split("://", 1)[1]
DESTINO = RAIZ / "impressao"
DESTINO.mkdir(exist_ok=True)

CAP = RAIZ.parent / ".claude" / "referencias-visuais" / "capturar-print.py"
spec = importlib.util.spec_from_file_location("cap", CAP)
cap = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cap)

# correção de erro Q (25%): aguenta papel amassado, dobra e impressora ruim
qr = segno.make(URL, error="q", micro=False)
svg = qr.svg_inline(scale=1, border=4, dark="#000000", light="#ffffff", omitsize=True)
assert "viewBox" in svg, svg[:200]
print("QR versão", qr.version, "·", qr.error, "·", qr.symbol_size(scale=1, border=4))

FOLHA = """
<style>
  @page { size: A4; margin: 0; }
  html, body { margin: 0; background: #ffffff !important; }
  body { width: 210mm; height: 297mm; overflow: hidden; }
  .marca-canto, main, #rodape { display: none !important; }
  .folha { box-sizing: border-box; width: 210mm; height: 297mm; padding: 26mm 22mm 20mm;
           display: flex; flex-direction: column; align-items: center; text-align: center;
           background: #ffffff; color: #16261f; font-family: 'Inter', 'Segoe UI', sans-serif; }
  .rotulo-a4 { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 10.5pt;
               letter-spacing: .18em; text-transform: uppercase; color: #5c6b62; }
  .titulo { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 72pt;
            line-height: .9; letter-spacing: -.02em; margin: 9mm 0 0; }
  .sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 500;
         font-size: 24pt; color: #99312b; margin-top: 3mm; }
  .lide { font-size: 13pt; line-height: 1.5; color: #3d4a43; max-width: 135mm; margin-top: 9mm; }
  .qr { width: 118mm; height: 118mm; margin-top: 12mm; }
  .qr svg { width: 100%; height: 100%; display: block; shape-rendering: crispEdges; }
  .aponte { font-size: 12pt; color: #3d4a43; margin-top: 4mm; }
  .link { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 15pt;
          letter-spacing: .01em; color: #16261f; margin-top: 7mm;
          padding: 3.5mm 6mm; border: .35mm solid #16261f; border-radius: 1mm; }
  .pe { margin-top: auto; font-size: 10pt; color: #5c6b62; }
  .pe b { color: #16261f; font-weight: 500; }
</style>
<div class="folha">
  <p class="rotulo-a4">[ Quiz · 12 perguntas · 4 minutos ]</p>
  <h1 class="titulo">Espécime</h1>
  <p class="sub">um quiz de ciência</p>
  <p class="lide">Evolução, fósseis, vacina e DNA.</p>
  <div class="qr">__QR__</div>
  <p class="aponte">Aponte a câmera do celular para o código, ou digite:</p>
  <p class="link">__LINK__</p>
  <p class="pe">Site feito por <b>Felipe Sites</b> · @felipesites</p>
</div>
""".replace("__QR__", svg).replace("__LINK__", TEXTO_LINK)

JS = """(async () => {
  document.body.innerHTML = %s;
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 400));
  return [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.style).join(', ');
})()""" % json.dumps(FOLHA)

LARG_CSS, ALT_CSS = 794, 1123          # A4 em px de CSS (96 dpi)
ESCALA = 2480 / LARG_CSS                # -> 2480 x 3508 px, 300 dpi

proc = cap.subir_edge()
try:
    alvo, wsurl = cap.nova_aba()
    ws = cap.WS(wsurl)
    try:
        ws.cmd("Page.enable")
        ws.cmd("Emulation.setDeviceMetricsOverride",
               {"width": LARG_CSS, "height": ALT_CSS, "deviceScaleFactor": ESCALA, "mobile": False})
        ws.cmd("Page.navigate", {"url": "http://localhost:4318/"}, timeout=90)
        time.sleep(3)
        r = ws.cmd("Runtime.evaluate", {"expression": JS, "awaitPromise": True, "returnByValue": True}, timeout=60)
        print("fontes:", r.get("result", {}).get("value"))
        time.sleep(0.5)
        png = ws.cmd("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False,
                     "clip": {"x": 0, "y": 0, "width": LARG_CSS, "height": ALT_CSS, "scale": 1}}, timeout=120)
        (DESTINO / "especime-qrcode-a4.png").write_bytes(base64.b64decode(png["data"]))
        pdf = ws.cmd("Page.printToPDF", {"printBackground": True, "preferCSSPageSize": True,
                     "marginTop": 0, "marginBottom": 0, "marginLeft": 0, "marginRight": 0}, timeout=120)
        (DESTINO / "especime-qrcode-a4.pdf").write_bytes(base64.b64decode(pdf["data"]))
    finally:
        ws.fechar()
        cap.fechar_aba(alvo)
finally:
    proc.terminate()

from PIL import Image
im = Image.open(DESTINO / "especime-qrcode-a4.png")
print("PNG:", im.size, "·", (DESTINO / "especime-qrcode-a4.png").stat().st_size // 1024, "KB")
# grava a resolução de impressão no arquivo, para o programa de impressão saber que é A4
im.convert("RGB").save(DESTINO / "especime-qrcode-a4.png", dpi=(300, 300), optimize=True)
print("PDF:", (DESTINO / "especime-qrcode-a4.pdf").stat().st_size // 1024, "KB")
