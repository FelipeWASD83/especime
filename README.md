# Espécime

Quiz de ciência com a biologia no centro. **Dez de biologia contra duas de
química ou física**, sorteadas de um banco de 60: evolução, fósseis, vacina,
DNA, bicho e planta, mais a molécula de água, a régua do pH e o porquê do céu
ser azul. Tem tanto história da ciência — Darwin, Mary Anning, Faraday — quanto
a ciência em si.

Uma explicação e uma prancha de museu a cada resposta, e um posto na Royal
Society no fim — de "visitante de domingo" a "presidente". Leva de três a cinco
minutos.

É um site público, feito pelo Felipe Sites: leva a assinatura no canto e os
contatos no rodapé, e tem política de privacidade, termos de uso e página de
créditos das imagens. Não tem servidor, cadastro, cookie nem rastreador.

---

## Publicar

**A pasta que vai para a Cloudflare é a `public/`, e só ela.** Tudo o que o
site precisa está lá dentro — páginas, fontes, imagens e o arquivo `_headers`
com os cabeçalhos de segurança. O resto do projeto (ferramentas, testes,
documentação) não sobe.

### Pelo painel da Cloudflare (como o Felipe publica)

1. *Workers & Pages* → *Create* → criar um **Worker** a partir de arquivos
   estáticos (a opção de enviar/arrastar arquivos).
2. Nome do Worker: **`especime`**.
3. Abrir a pasta `public/`, selecionar **tudo o que está dentro** (Ctrl+A) e
   arrastar. Não arrastar a pasta do projeto inteira: ela leva regras, testes,
   o histórico do git e o `wrangler.jsonc`, e o painel reclama que "parece um
   projeto com arquivo de configuração do wrangler". O envio certo tem menos de 80
   arquivos, com o `index.html` na raiz.
4. Depois que publicar, abrir o endereço e conferir.

**A página 404 funciona pelo painel.** Conferido em 25/09/2026, com o site no
ar: `/qualquer-coisa` devolve a página "Não catalogado" com o código 404 certo,
e os cabeçalhos de segurança do `_headers` também foram aplicados.

### Pelo comando

```powershell
npx wrangler login
npx wrangler deploy
```

Aqui a 404 funciona garantida. Para conferir sem publicar:
`npx wrangler deploy --dry-run`.

### O endereço

O site vai ficar em **<https://especime.felipe-sites0.workers.dev>** — e esse
endereço já está escrito nas páginas (prévia com imagem no WhatsApp, `sitemap.xml`
e `robots.txt`). Por isso o Worker **tem que se chamar `especime`**: com outro
nome, o endereço muda e a prévia do link aponta para o lugar errado.

Se um dia o endereço mudar (outro nome, domínio próprio), rode

```powershell
python ferramentas\gerar-paginas.py --endereco https://o-endereco-novo
```

e publique a `public/` de novo.

---

## Folha para imprimir

Em `impressao/` fica a folha A4 de divulgação, com o QR code e o endereço:

- `especime-qrcode-a4.pdf` — **use este para imprimir**: é A4 exato e vetorial;
- `especime-qrcode-a4.png` — a mesma folha em imagem, 2480 × 3508 px (300 DPI).

O fundo é branco puro. O QR foi lido de volta por um leitor de verdade — na
folha original, numa foto pequena e borrada e numa impressão fraca, em que o
preto sai cinza — e nos três casos abriu o endereço certo. Ele tem correção de
erro de 25%, então aguenta papel dobrado ou um pouco sujo.

Para refazer (se o endereço mudar, por exemplo), com o servidor da 4318 no ar:

```powershell
python -m pip install --user segno
python ferramentas\gerar-qrcode.py
```

Os dois arquivos são substituídos no mesmo lugar.

## Ver no PC

Duas entradas no `.claude/launch.json` da raiz:

| Porta | O que é | Quando usar |
|---|---|---|
| **4318** | servidor simples do Python | mexer e olhar |
| **8789** | o Worker de verdade (`npx wrangler dev`) | conferir antes de publicar: é o único que aplica os cabeçalhos de segurança e a página 404, e comprime como a Cloudflare |

Na mão: `python -m http.server 4318 --directory public` e abrir
<http://localhost:4318>.

## Testar

```powershell
node --test testes/*.test.js
```

29 testes. Os da partida (`quiz.test.js`) conferem o sorteio, a mistura de
níveis, o 80/20 de biologia e a pontuação. Os do site (`site.test.js`) conferem
que todas as páginas têm o rodapé com os contatos e os links legais, que nada é
buscado em outro servidor, que toda imagem tem crédito publicado, que nenhuma
prancha sobra sem pergunta e que o nome antigo não voltou. **Se um teste
quebrar depois de mexer no conteúdo, é o conteúdo que está errado.**

---

## Mexer no conteúdo

### Contatos, textos legais e rodapé

Tudo fica no começo de `ferramentas/gerar-paginas.py`: e-mail, WhatsApp,
Instagram, nome do site e a data de atualização das políticas. Mudou algo lá,
rode:

```powershell
python ferramentas\gerar-paginas.py
```

Ele refaz a política de privacidade, os termos, os créditos, a 404, o
`robots.txt` e o rodapé de **todas** as páginas, inclusive o da capa. Não
edite o rodapé à mão em nenhum HTML: da próxima vez que o gerador rodar, a
edição some.

### Acrescentar uma pergunta

Abrir `public/js/dados/perguntas.js` e copiar o formato de qualquer uma:

```js
{
  id: 'nome-curto-e-unico',
  area: 'bio',               // bio | quimica | fisica
  nivel: 'facil',            // facil | media | dificil
  pergunta: 'A pergunta?',
  alternativas: ['certa', 'errada', 'errada', 'errada'],
  correta: 0,                // qual das quatro está certa (começa em 0)
  explicacao: 'O que aparece depois que a pessoa responde.',
  prancha: 'darwin',         // uma chave de pranchas.js
},
```

**Só existem três áreas: `bio`, `quimica` e `fisica`.** Pergunta que não cabe
em nenhuma das três não entra no quiz. Depois de acrescentar, rode o
`gerar-paginas.py` — é ele que escreve os números da capa ("60 perguntas ·
37 pranchas").

### Mudar a dificuldade ou a dose de biologia

No fim de `perguntas.js`:

```js
export const MISTURA = { facil: 5, media: 5, dificil: 2 };
export const EXATAS_POR_PARTIDA = 2;
```

O primeiro é a **dificuldade**: cinco fáceis, cinco medianas e duas difíceis.
O segundo é o **tema**: quantas das doze são de química ou física. Com `2` dá
83% de biologia; `0` faz um quiz só de biologia.

### Imagem nova

Acrescentar a busca em `BUSCAS`, no começo de `ferramentas/baixar-pranchas.py`,
e rodar o script: ele baixa só imagem com licença livre, escreve o crédito no
`CREDITOS.md` e gera a miniatura. Depois, `gerar-paginas.py` para a página de
créditos publicada acompanhar. **Imagem sem crédito publicado não pode subir** —
as da Wellcome são CC BY e a licença exige o crédito visível.

### Mudar as cores

No começo de `public/css/estilo.css`, no bloco `:root`, cada cor tem nome em
português e um comentário dizendo o que controla.

---

## Como está montado

```
public/                  o site inteiro — é isto que sobe para a Cloudflare
  index.html             capa, quiz e resultado
  privacidade/ termos/   páginas legais (geradas)
  creditos/              créditos de cada imagem e fonte (gerada)
  404.html               página de erro (gerada)
  _headers               cabeçalhos de segurança e de cache
  robots.txt             (gerado)
  css/estilo.css         uma folha só, com o sistema no topo
  js/app.js              o que pinta e anima
  js/quiz.js             a lógica da partida
  js/dados/              perguntas.js e pranchas.js
  img/pranchas/          as imagens das respostas, em cinza
  img/miniaturas/        as mesmas, pequenas e tingidas, para a fita da capa
  img/compartilhar.jpg   a figura da prévia de link
  fontes/                as três fontes e a licença delas
ferramentas/
  baixar-pranchas.py     baixa imagens do Wikimedia e faz as miniaturas
  gerar-paginas.py       páginas legais, 404, rodapé, números da capa, endereço
  gerar-qrcode.py        a folha A4 com o QR code
impressao/               a folha A4 pronta, em PDF e PNG (não vai para o site)
testes/                  node --test
wrangler.jsonc           a configuração do Worker (usada pelo comando)
CREDITOS.md              registro das imagens (gerado, não editar à mão)
```

## Feito para celular fraco em 4G

- **Nada de outro servidor:** as fontes moram no site. Menos conexões para
  abrir no 4G, e a política de privacidade pode dizer que nada sai daqui.
- **A capa não espera o quiz:** o banco de perguntas e as pranchas baixam em
  segundo plano depois que a capa aparece. Na medição, "Começar" abriu a
  primeira pergunta em 7 ms.
- **A prancha chega antes da resposta:** a imagem começa a baixar junto com a
  pergunta, então aparece na hora em que a pessoa responde.
- **A fita da capa usa miniaturas** de ~9 KB já tingidas, e só baixa as que
  aparecem. Antes eram quase 2 MB de imagens grandes tingidas pelo navegador.
- **Nada de efeito caro:** sem desfoque por cima da página, sem modo de mistura
  em área grande, animação parada quando está fora da tela, e a prancha chega
  sem desfoque animado no celular.
