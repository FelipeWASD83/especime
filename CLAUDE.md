# CLAUDE.md — Espécime

Decisões fechadas deste projeto. O `README.md` conta o que ele é e como rodar;
aqui fica o que **não** se desfaz sem motivo.

Vale o `CLAUDE.md` da pasta `Claude Code` por cima de tudo que não estiver
contradito aqui.

---

## 1. O que é

Quiz de ciência feito para leigo, **público**, num Worker da Cloudflare. Nasceu
como "Sociedade Real", sobre cientistas da Inglaterra; **em 25/09/2026 ele
escolheu o nome "Espécime"** (a pasta, que se chamava
`quiz-cientistas-ingleses`, virou `especime` no mesmo dia). O nome antigo não pode reaparecer em lugar
nenhum do site, e um teste cobra isso.

**O tema central é biologia**, e isso é decisão dele, de 22/09/2026: "o tema
central do quiz é a biologia e não a ciência como um todo, você pode incluir
física e química também, mas deve ser 80% biologia e 20% química e física", e
logo depois: "você pode colocar qualquer coisa desde que tenha a ver com
biologia, química ou física". Quem cumpre isso é a seção 2.

A segunda frase é o que solta o escopo: **não precisa ser sobre cientista
inglês.** Pode ser a ciência em si — o que a fotossíntese faz, do que é feita a
água, por que o céu é azul. O que não pode é sair das três áreas.

**É projeto pessoal do Felipe e leva a marca do Felipe Sites de propósito** — o
site é vitrine de trabalho, e ele vai apresentá-lo. Por isso a assinatura no
canto, o bloco de oferta e os contatos no rodapé não são enfeite. Os contatos
são os do Felipe Sites (e-mail `felipe.sites0@gmail.com`, WhatsApp
(31) 98446-5713, Instagram `@felipesites`, os mesmos de
`felipe-sites/vitrine/js/dados.js`) mais o Instagram pessoal dele,
`@felipe.wasd`, como autor do quiz.

Mesmo levando a marca, **não é projeto de cliente**: não vive em conta de
cliente e não segue identidade de terceiro.

## 2. Tema e dificuldade — as duas decisões centrais

Duas garantias valem ao mesmo tempo em toda partida, e as duas têm teste:

```js
export const MISTURA = { facil: 5, media: 5, dificil: 2 };  // dificuldade
export const EXATAS_POR_PARTIDA = 2;                        // tema
```

**Tema.** Toda pergunta tem `area`, e **só existem três**: `bio` (biologia em
sentido largo — evolução, fósseis, medicina, genética, bicho, planta),
`quimica` e `fisica`. Astronomia entra em `fisica`. Cada partida leva 10 de
`bio` e 2 das outras duas somadas: 83% de biologia.

**Pergunta que não cabe em nenhuma das três não entra no banco**, e um teste
cobra isso. Foi por essa regra que as perguntas de computação — Ada Lovelace,
Babbage, o teste de Turing, Bletchley Park — saíram em 22/09/2026, junto com a
do lema da Royal Society. Estão no histórico do git, se ele mudar de ideia.

**Dificuldade.** O pedido original foi *"dificuldade mediana, para pessoas que
não sabem de absolutamente nada sobre o assunto conseguirem acertar algumas"*.
Daí cinco fáceis, cinco medianas e duas difíceis. **Não trocar por sorteio
uniforme do banco** — banco maior de perguntas difíceis passaria a derrubar a
média sozinho.

**A ordem do sorteio não é detalhe:** as de `exatas` são sorteadas primeiro, de
qualquer nível, e a biologia preenche o que falta em cada nível. Ao contrário,
as perguntas difíceis de exatas nunca sairiam — o nível difícil já estaria
cheio de biologia. Tem teste em cima disso.

Por isso o banco de biologia precisa aguentar sozinho a cota de cada nível no
pior caso (5 fáceis, 5 médias, 2 difíceis), mesmo que nenhuma de exatas caia
naquele nível. Hoje ele tem folga: 11, 14 e 8.

O nível de cada pergunta segue esta régua:

- **fácil** — o nome famoso é a resposta (Darwin/Beagle, Newton/gravidade,
  Jenner/varíola). Quem só ouviu falar acerta.
- **média** — exige uma associação, não só o nome (por que Darwin publicou em
  1859, quem descobriu Urano).
- **difícil** — detalhe de quem já leu sobre o assunto (o buldogue de Darwin,
  as oito anos de craca, o lema da Royal Society).

Pergunta nova de biologia é sempre bem-vinda. De química ou física também,
mas lembrando que só duas por partida saem dali — o banco dessas duas rende
muito mais do que aparece.

Cada pergunta tem **exatamente quatro** alternativas, todas diferentes, e a
explicação é obrigatória — é ela que faz o leigo sair sabendo mais do que
entrou. Distrator tem que ser plausível, nunca piada.

Tamanho da partida: doze perguntas, que é o que cabe em três a cinco minutos
**com as explicações**. Mudar esse número muda a promessa da capa.

## 3. Direção visual — gabinete de história natural

Fechada em 22/09/2026, depois de ler `.claude/referencias-visuais/CLAUDE.md`.
Papel creme, **tinta verde-escura no lugar do preto** (`#16261f`, nunca `#000`),
um carmim só para ação e erro, verde só para acerto. Serifa alta e fina
(Cormorant Garamond, peso 300) nos títulos; letra de máquina (IBM Plex Mono)
**apenas** em etiqueta e metadado, nunca no corpo.

O que veio de onde:

- **ERA Residence** (`premiado-era-residence-topo.png`) — serifa display alta e
  fina no nome, e o selo circular com texto em arco.
- **State of AI in Design** (`premiado-state-of-ai-design-topo.png`) —
  assimetria deliberada (metadado pequeno à esquerda contra título gigante à
  direita) e mono só em crédito e metadado.
- **Produx** (`premiado-produx-design-topo.png`) — título gigante em peso leve
  em vez de negrito, quase-preto em vez de preto, marcadores em colchetes.

**O elemento que só faz sentido aqui é a prancha:** cada resposta revela um
retrato ou diagrama emoldurado, com etiqueta de espécime
(`[ PRANCHA 03 · 1859 ]`), nome e nota. Se algum dia o quiz perder a prancha,
perdeu a direção junto.

### Fundos

Regra da pasta: dois blocos seguidos nunca têm o mesmo tom. A ordem de cada
tela, medida por luminância em 22/09/2026:

| Tela | Ordem |
|---|---|
| Capa | papel → tinta → papel → tinta (rodapé) |
| Quiz | papel (o rodapé some durante a partida, de propósito) |
| Resultado | tinta → papel → tinta (rodapé) |
| Privacidade, termos, créditos | papel (título e texto num bloco só) → tinta (rodapé) |
| 404 | papel → tinta (rodapé) |

Medido de novo em 25/09/2026, em 1440 px e em 390 px.

Acrescentar seção obriga a conferir isso de novo, **medindo**, não olhando.

## 4. Animação — a regra que já custou um bug

**Nenhuma animação de entrada usa `animation-fill-mode: both` ou `backwards`
para segurar o estado inicial.** Aba em segundo plano não roda animação, e o
conteúdo ficava preso no primeiro quadro — a troca de tela travou assim no
primeiro teste, e a prancha ficava invisível.

As duas consequências, que não se desfazem:

- **Troca de tela é comandada por `setTimeout`**, não por `animationend`
  (`mostrarTela`, em `app.js`). Evento de fim de animação que não dispara
  deixa o site morto.
- **O estado final é o estado normal do elemento.** O lacre de acerto, o risco
  na alternativa errada e a prancha revelada são visíveis por CSS comum; a
  animação só encena a chegada. `backwards` só aparece onde existe `delay`, e
  nunca segura o que o usuário precisa ver.

O placar do resultado segue a mesma ideia: o número certo é escrito primeiro, a
contagem animada vem por cima.

Tudo respeita `prefers-reduced-motion`.

## 5. As pranchas

`ferramentas/baixar-pranchas.py` busca no Wikimedia Commons, **descarta
qualquer arquivo sem licença livre declarada** e escreve o `CREDITOS.md`
sozinho — o arquivo é gerado, não se edita à mão. As imagens são guardadas em
tons de cinza; o tom de tinta sobre papel é do CSS. O mesmo script faz as
**miniaturas** da fita da capa (`img/miniaturas/`, 240 × 320, já recortadas e
**já tingidas**, para o navegador não precisar de filtro).

**Crédito publicado é obrigatório.** Parte das imagens (as da Wellcome) é
CC BY 4.0, e a licença exige crédito visível para quem vê o site — o
`CREDITOS.md` sozinho não basta, porque não é publicado. A página
`/creditos/` sai do `CREDITOS.md` pelo `gerar-paginas.py`, e um teste reprova
imagem sem crédito publicado. Prancha que nenhuma pergunta usa também é
reprovada: ela aparecia na fita e na contagem da capa à toa.

Nove das pranchas são **diagramas em SVG desenhados aqui**. Existem por dois
motivos: de gente do século XX — Rosalind Franklin, Dorothy Hodgkin, Hawking —
**não há retrato em domínio público confiável**; e conceito puro (a molécula de
água, a régua do pH, o carbono em dois arranjos, a bobina de Faraday) fica
melhor desenhado que fotografado. Não trocar por foto encontrada solta na
internet: ou é livre e verificada, ou é desenho.

Teto de peso por prancha: 110 KB. O script aperta a qualidade sozinho até caber.

## 6. Site público: páginas legais, rodapé e segurança

`ferramentas/gerar-paginas.py` é a fonte única de: rodapé (em **todas** as
páginas, inclusive encaixado na capa entre `<!-- rodape:inicio -->` e
`<!-- rodape:fim -->`), política de privacidade, termos, créditos, 404,
`robots.txt`, números da capa e, quando houver, endereço público (canonical,
`og:image`, `sitemap.xml`, guardado em `ferramentas/site.json`). **Nunca editar
essas partes à mão no HTML**: o gerador sobrescreve.

A política de privacidade diz que **nada sai do navegador de quem visita**.
Isso só é verdade porque:

- **nenhum recurso vem de outro servidor** — as fontes são servidas do próprio
  site (`public/fontes/`, com a licença OFL ao lado). Não voltar para o Google
  Fonts nem pôr script de análise, anúncio ou incorporação sem **reescrever a
  política antes**. Um teste reprova recurso externo;
- **não há cookie nem `localStorage`**. Um placar salvo, por exemplo, obriga a
  mudar a política.

`public/_headers` aplica uma **política de segurança (CSP) que só aceita o que
vem do próprio site**: nada de `<script>` ou `<style>` embutidos no HTML, nada
de atributo `style=` no HTML (o JS pode mexer em `elemento.style`, isso é
permitido). Conferido em 25/09/2026 com uma partida inteira no `wrangler dev`:
zero bloqueio. Qualquer mudança de front-end se confere na porta **8789**, que
é a única que aplica o `_headers`.

## 7. Celular fraco em 4G — o que não se desfaz

Pedido dele em 25/09/2026. Medido com celular simulado (390 px, 4G lento,
processador 4× mais lento):

- **A capa não carrega o quiz.** `app.js` busca `quiz.js` e `pranchas.js` com
  `import()` depois do `load`, em segundo plano; a fita da capa e o botão
  "Começar" esperam por essa mesma promessa. Não voltar a importar os dados no
  topo do `app.js` nem pôr `modulepreload` neles: isso fazia os scripts
  disputarem banda com o CSS, que é o que libera o primeiro desenho.
- **O `preload` da fonte do título fica.** Testado sem ele: o CSS chegou
  igual e a fonte do título atrasou 2,5 s.
- **A prancha da pergunta é baixada junto com a pergunta** (`adiantarPrancha`).
  Na medição, 12 de 12 pranchas estavam prontas no instante da resposta.
- **Nada de efeito caro**: sem `backdrop-filter`, sem `mix-blend-mode` em área
  grande, animações infinitas pausadas fora da tela, e no celular a prancha
  chega sem desfoque animado.

**Armadilha de medição:** o Kaspersky do PC dele injeta um script que trava o
primeiro desenho por ~2 s em qualquer página, até em `127.0.0.1`. Visitante não
tem isso. Para medir, olhar quando os arquivos do próprio site terminam, não o
tempo total de primeiro desenho. O Kaspersky também pode sujar o console com
avisos de segurança por causa da CSP — não é defeito do site.

## 8. Armadilhas

- **Mexeu em `perguntas.js` ou `pranchas.js`, roda o teste.** Ele pega chave de
  prancha inexistente, alternativa repetida e arquivo faltando no disco — que é
  justamente o erro que só apareceria jogando.
- **Não existe código de servidor.** O `wrangler.jsonc` não tem `main`, só
  `assets`. Se um dia precisar de backend, é decisão nova, não detalhe.
- **Portas 4318 (estático) e 8789 (`wrangler dev`)**, registradas no
  `PORTAS.md` e no `launch.json` da raiz.
- **Deploy é decisão do Felipe, e ele publica pelo painel da Cloudflare**, como
  Worker chamado `especime`, enviando o **conteúdo** de `public/` — nunca a
  pasta do projeto (da primeira vez ele arrastou a pasta inteira, 304 arquivos
  com `.git` e regras, e o painel reclamou do `wrangler.jsonc`). Pelo painel o
  `wrangler.jsonc` não é lido, mas a 404 funcionou mesmo assim: conferido no ar
  em 25/09/2026, junto com os cabeçalhos do `_headers`.
- **O endereço público é `https://especime.felipe-sites0.workers.dev`**, e está
  escrito nas páginas (`ferramentas/site.json`). Se o nome do Worker mudar, o
  endereço muda: rodar `gerar-paginas.py --endereco` e `gerar-qrcode.py`.
- **`impressao/`** guarda a folha A4 de divulgação com o QR (PDF e PNG),
  refeita por `ferramentas/gerar-qrcode.py` no mesmo lugar. Fundo branco puro,
  QR preto puro, correção de erro Q — é impresso e escaneado de longe; não
  trocar o preto do QR pela tinta do site nem tirar a margem branca dele. A
  folha não vai para o site.
