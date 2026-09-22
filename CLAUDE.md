# CLAUDE.md — Sociedade Real

Decisões fechadas deste projeto. O `README.md` conta o que ele é e como rodar;
aqui fica o que **não** se desfaz sem motivo.

Vale o `CLAUDE.md` da pasta `Claude Code` por cima de tudo que não estiver
contradito aqui.

---

## 1. O que é

Quiz sobre Darwin e outros cientistas da **Inglaterra**, feito para leigo. Vai
para um Worker da Cloudflare. **É projeto pessoal do Felipe e leva a marca do
Felipe Sites de propósito** — o site é vitrine de trabalho, não só brincadeira.
Por isso a assinatura no canto e o bloco de oferta no rodapé não são enfeite:
tirar qualquer um dos dois tira a razão comercial do projeto.

Mesmo levando a marca, **não é projeto de cliente**: não vive em conta de
cliente e não segue identidade de terceiro.

## 2. Dificuldade — a decisão central

O pedido foi: *"dificuldade mediana, para pessoas que não sabem de absolutamente
nada sobre o assunto conseguirem acertar algumas"*. Quem cumpre isso é a
`MISTURA` em `public/js/dados/perguntas.js`:

```js
export const MISTURA = { facil: 5, media: 5, dificil: 2 };
```

Cada partida sorteia exatamente cinco fáceis, cinco medianas e duas difíceis, e
um teste garante isso. **Não trocar por sorteio uniforme do banco** — banco
maior de perguntas difíceis passaria a derrubar a média sozinho.

O nível de cada pergunta segue esta régua:

- **fácil** — o nome famoso é a resposta (Darwin/Beagle, Newton/gravidade,
  Jenner/varíola). Quem só ouviu falar acerta.
- **média** — exige uma associação, não só o nome (por que Darwin publicou em
  1859, quem descobriu Urano).
- **difícil** — detalhe de quem já leu sobre o assunto (o buldogue de Darwin,
  as oito anos de craca, o lema da Royal Society).

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
tons de cinza; o tom de tinta sobre papel é do CSS.

Seis pranchas são **diagramas em SVG desenhados aqui** (prisma, Foto 51,
penicilina, molécula, rotor da Enigma, buraco negro). Existem porque de gente
do século XX — Turing, Rosalind Franklin, Dorothy Hodgkin, Hawking — **não há
retrato em domínio público confiável**. Não trocar por foto encontrada solta na
internet: ou é livre e verificada, ou é desenho.

Teto de peso por prancha: 110 KB. O script aperta a qualidade sozinho até caber.

## 6. Armadilhas

- **Mexeu em `perguntas.js` ou `pranchas.js`, roda o teste.** Ele pega chave de
  prancha inexistente, alternativa repetida e arquivo faltando no disco — que é
  justamente o erro que só apareceria jogando.
- **Não existe código de servidor.** O `wrangler.jsonc` não tem `main`, só
  `assets`. Se um dia precisar de backend, é decisão nova, não detalhe.
- **Porta 4318**, registrada no `PORTAS.md` e no `launch.json` da raiz.
- **Deploy é decisão do Felipe.** Este projeto não está na lista de deploy
  automático da pasta.
