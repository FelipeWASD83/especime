# Sociedade Real

Quiz de ciência com a biologia no centro. **Dez de biologia contra duas de
química ou física**, sorteadas de um banco de 60: evolução, fósseis, vacina,
DNA, bicho e planta, mais a molécula de água, a régua do pH e o porquê do céu
ser azul. Tem tanto história da ciência inglesa — Darwin, Mary Anning,
Faraday — quanto a ciência em si.

Uma explicação e uma prancha de museu a cada resposta, e um posto na Royal
Society no fim — de "visitante de domingo" a "presidente".

Leva de três a cinco minutos. Roda inteiro no navegador: não tem servidor, não
tem cadastro, não guarda nada de ninguém.

---

## Como ver no PC

O preview do Claude Code já sobe pela entrada `quiz-cientistas-ingleses` do
`.claude/launch.json` da raiz, na porta **4318**. Na mão:

```powershell
python -m http.server 4318 --bind 127.0.0.1 --directory public
```

E abrir <http://localhost:4318>.

## Como publicar

Vai para um Worker da Cloudflare chamado **`sociedade-real`**, no modo só de
arquivos estáticos — não existe código de servidor, a Cloudflare serve a pasta
`public/` direto da borda.

```powershell
npx wrangler deploy
```

Primeira vez: `npx wrangler login` antes. Para conferir a configuração sem
publicar nada:

```powershell
npx wrangler deploy --dry-run
```

Depois de publicar, o site fica em `https://sociedade-real.<sua-conta>.workers.dev`.
Domínio próprio se configura no painel da Cloudflare, em Workers → o worker →
Settings → Domains & Routes.

## Como testar

```powershell
node --test testes/*.test.js
```

Dezesseis testes: a lógica da partida (sorteio, mistura de níveis, pontuação,
fim de jogo) e a integridade dos dados — toda pergunta com quatro alternativas
diferentes, toda pergunta apontando para uma prancha que existe, e toda prancha
de foto com arquivo no disco. **Se um teste quebrar depois de mexer no banco de
perguntas, é o banco que está errado, não o teste.**

---

## Mexer no conteúdo

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
em nenhuma das três não entra no quiz, e um teste cobra isso. `bio` é biologia
em sentido largo: evolução, fósseis, medicina, genética, bicho, planta.

As alternativas são embaralhadas na hora de jogar — a ordem escrita aqui nunca
aparece na tela. Os números da capa saem dos dados sozinhos.

### Mudar a dificuldade ou a dose de biologia

No fim do mesmo arquivo, dois números mandam em tudo:

```js
export const MISTURA = { facil: 5, media: 5, dificil: 2 };
export const EXATAS_POR_PARTIDA = 2;
```

O primeiro é a **dificuldade**: cinco fáceis, cinco medianas e duas difíceis =
doze perguntas. É o que segura o quiz no meio — quem não sabe nada acerta as
fáceis e aprende o resto nas explicações.

O segundo é o **tema**: quantas das doze são de química ou física. Com `2`, dá
dez de biologia contra duas de fora — 83%. Pôr `0` faz um quiz só de biologia;
pôr `6` divide meio a meio.

Os dois testes correspondentes falham na hora se o banco não aguentar o que
você pediu.

### Mudar as cores

Tudo está no começo de `public/css/estilo.css`, no bloco `:root`, com o nome em
português e um comentário dizendo o que cada cor controla. Trocar o valor ali
muda o site inteiro.

---

## Como está montado

```
public/            o site inteiro (é o que a Cloudflare publica)
  index.html       as três telas: capa, quiz e resultado
  404.html         página de erro, no mesmo visual
  css/estilo.css   uma folha só, com o sistema no topo
  js/quiz.js       a lógica da partida, sem tocar em tela
  js/app.js        o que pinta e anima
  js/dados/        perguntas.js e pranchas.js
  img/pranchas/    as imagens, em cinza e WebP
ferramentas/       o script que baixa as pranchas do Wikimedia
testes/            node --test
wrangler.jsonc     a configuração do Worker
CREDITOS.md        autoria e licença de cada imagem (gerado, não editar à mão)
```

As 31 pranchas fotográficas vêm do Wikimedia Commons, em domínio público ou sob
licença livre, baixadas por `ferramentas/baixar-pranchas.py` — que só aceita
arquivo com licença clara e escreve o `CREDITOS.md` sozinho. As outras dez são
diagramas em SVG desenhados para o projeto: ou porque não existe retrato livre
de quem é do século XX, ou porque o conceito (a molécula de água, a régua do
pH, o carbono em dois arranjos) se explica melhor desenhado que fotografado.
