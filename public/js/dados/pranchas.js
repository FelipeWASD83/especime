// As pranchas — a imagem que aparece quando a pessoa responde.
//
// Duas espécies:
//   tipo 'foto'    → arquivo em img/pranchas/, vindo do Wikimedia Commons
//                    (domínio público ou licença livre; ver CREDITOS.md)
//   tipo 'desenho' → diagrama em SVG desenhado aqui mesmo, para os casos em
//                    que não existe retrato livre (gente do século XX) ou em
//                    que o objeto conta a história melhor que um rosto.
//
// `legenda` vira a etiqueta da prancha; `nota` é a linha em letra de máquina
// embaixo dela.

const desenho = (conteudo) =>
  `<svg viewBox="0 0 320 320" role="img" fill="none"
        stroke="currentColor" stroke-width="1.4"
        stroke-linecap="round" stroke-linejoin="round">${conteudo}</svg>`;

// Prisma de Newton: um feixe entra branco e sai aberto em leque.
const PRISMA = desenho(`
  <path d="M160 74 L246 226 L74 226 Z" stroke-width="1.8"/>
  <path d="M16 150 L132 150" stroke-width="2.2"/>
  <path d="M132 150 L186 178"/>
  ${[0, 1, 2, 3, 4, 5]
    .map((i) => `<path d="M186 178 L300 ${196 + i * 13}" opacity="${1 - i * 0.11}"/>`)
    .join('')}
  <circle cx="132" cy="150" r="2.6" fill="currentColor" stroke="none"/>
`);

// Foto 51: o X de manchas que o DNA desenha ao espalhar raios X.
const FOTO51 = (() => {
  const pontos = [];
  for (let i = -4; i <= 4; i += 1) {
    if (i === 0) continue;
    const distancia = Math.abs(i);
    const raio = 11 - distancia * 1.6;
    const passo = 27;
    for (const sinal of [1, -1]) {
      pontos.push(
        `<ellipse cx="${160 + sinal * i * passo * 0.78}" cy="${160 - i * passo}" ` +
          `rx="${raio}" ry="${raio * 0.72}" fill="currentColor" stroke="none" ` +
          `opacity="${0.86 - distancia * 0.14}"/>`,
      );
    }
  }
  return desenho(`
    <circle cx="160" cy="160" r="132" stroke-width="1.6"/>
    <circle cx="160" cy="160" r="122" stroke-dasharray="2 7" opacity="0.5"/>
    ${pontos.join('')}
    <circle cx="160" cy="160" r="15" fill="currentColor" stroke="none" opacity="0.18"/>
  `);
})();

// Rotor da Enigma: o anel de 26 letras e a fiação embaralhada por dentro.
const ENIGMA = (() => {
  const marcas = [];
  for (let i = 0; i < 26; i += 1) {
    const angulo = (i / 26) * Math.PI * 2 - Math.PI / 2;
    const [cos, sen] = [Math.cos(angulo), Math.sin(angulo)];
    marcas.push(
      `<path d="M${160 + cos * 118} ${160 + sen * 118} L${160 + cos * 130} ${160 + sen * 130}"/>`,
    );
  }
  const fios = [
    [0, 9], [3, 17], [6, 22], [11, 1], [14, 20], [19, 5], [24, 13],
  ].map(([a, b]) => {
    const p = (i) => {
      const angulo = (i / 26) * Math.PI * 2 - Math.PI / 2;
      return `${160 + Math.cos(angulo) * 92} ${160 + Math.sin(angulo) * 92}`;
    };
    return `<path d="M${p(a)} Q160 160 ${p(b)}" opacity="0.55"/>`;
  });
  return desenho(`
    <circle cx="160" cy="160" r="132" stroke-width="1.8"/>
    <circle cx="160" cy="160" r="118"/>
    <circle cx="160" cy="160" r="92" stroke-dasharray="3 6" opacity="0.6"/>
    <circle cx="160" cy="160" r="26"/>
    ${marcas.join('')}
    ${fios.join('')}
  `);
})();

// Buraco negro: o disco, o anel de luz e a malha do espaço entortando.
const BURACO_NEGRO = (() => {
  const malha = [];
  for (let i = 1; i <= 6; i += 1) {
    const y = 40 + i * 40;
    const curva = 46 - Math.abs(3.5 - i) * 11;
    malha.push(
      `<path d="M14 ${y} Q160 ${y + curva} 306 ${y}" opacity="${0.45 - i * 0.03}"/>`,
    );
  }
  return desenho(`
    ${malha.join('')}
    <circle cx="160" cy="160" r="86" stroke-width="1.6" opacity="0.7"/>
    <ellipse cx="160" cy="160" rx="118" ry="30" opacity="0.5"/>
    <circle cx="160" cy="160" r="54" fill="currentColor" stroke="none"/>
    <circle cx="160" cy="160" r="64" stroke-width="2.4"/>
  `);
})();

// Placa de Petri: o mofo num canto e o halo onde a bactéria não cresceu.
const PENICILINA = (() => {
  const colonias = [];
  const semente = [
    [95, 232], [126, 258], [72, 196], [214, 230], [246, 190], [228, 262],
    [58, 148], [258, 132], [104, 276], [196, 276], [268, 226], [46, 216],
  ];
  for (const [x, y] of semente) {
    colonias.push(`<circle cx="${x}" cy="${y}" r="5.5" fill="currentColor" stroke="none" opacity="0.5"/>`);
    colonias.push(`<circle cx="${x + 13}" cy="${y - 9}" r="3.4" fill="currentColor" stroke="none" opacity="0.38"/>`);
  }
  return desenho(`
    <circle cx="160" cy="160" r="140" stroke-width="1.8"/>
    <circle cx="160" cy="160" r="130" opacity="0.4"/>
    ${colonias.join('')}
    <circle cx="150" cy="104" r="86" stroke-dasharray="4 6" opacity="0.6"/>
    <path d="M110 74 q22 -26 48 -14 q28 -13 44 12 q24 14 10 40 q6 30 -26 34
             q-20 20 -44 6 q-28 6 -36 -20 q-18 -24 4 -58 Z" stroke-width="1.6"/>
    <path d="M128 92 q18 10 36 4 M132 112 q24 -8 44 6 M150 70 q6 18 -2 34" opacity="0.65"/>
  `);
})();

// Penicilina em fórmula: os dois anéis colados que Hodgkin revelou.
const MOLECULA = desenho(`
  <path d="M112 128 L112 192 L172 192 L172 128 Z" stroke-width="1.8"/>
  <path d="M172 128 L232 104 L268 152 L236 202 L172 192" stroke-width="1.8"/>
  <path d="M112 128 L56 104 M112 192 L56 216" />
  <path d="M116 132 L116 188" opacity="0.55"/>
  <circle cx="112" cy="128" r="12" fill="var(--papel)"/>
  <circle cx="232" cy="104" r="12" fill="var(--papel)"/>
  <circle cx="56" cy="104" r="12" fill="var(--papel)"/>
  <text x="112" y="133" font-size="15" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">N</text>
  <text x="232" y="109" font-size="15" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">S</text>
  <text x="56" y="109" font-size="15" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">O</text>
`);

export const PRANCHAS = {
  darwin: { tipo: 'foto', arquivo: 'darwin.webp', nome: 'Charles Darwin', legenda: '1809 – 1882', nota: 'Fotografia de Leonard Darwin, por volta de 1874.' },
  beagle: { tipo: 'foto', arquivo: 'beagle.webp', nome: 'HMS Beagle', legenda: '1831 – 1836', nota: 'O Beagle no estreito de Magalhães, com o monte Sarmiento ao fundo.' },
  tentilhoes: { tipo: 'foto', arquivo: 'tentilhoes.webp', nome: 'Os bicos de Galápagos', legenda: '1845', nota: 'Gravura de John Gould para o diário de viagem de Darwin.' },
  origem: { tipo: 'foto', arquivo: 'origem.webp', nome: 'A Origem das Espécies', legenda: '1859', nota: 'Folha de rosto da primeira edição, John Murray, Londres.' },
  wallace: { tipo: 'foto', arquivo: 'wallace.webp', nome: 'Alfred Russel Wallace', legenda: '1823 – 1913', nota: 'Colecionador de insetos, chegou à seleção natural sozinho.' },
  huxley: { tipo: 'foto', arquivo: 'huxley.webp', nome: 'Thomas Henry Huxley', legenda: '1825 – 1895', nota: 'O homem que brigava em público pelas ideias de Darwin.' },
  newton: { tipo: 'foto', arquivo: 'newton.webp', nome: 'Isaac Newton', legenda: '1643 – 1727', nota: 'Retrato de Godfrey Kneller, pintado em 1689.' },
  principia: { tipo: 'foto', arquivo: 'principia.webp', nome: 'Principia', legenda: '1687', nota: 'Folha de rosto da primeira edição, impressa em Londres.' },
  prisma: { tipo: 'desenho', svg: PRISMA, nome: 'O experimento do prisma', legenda: '1666', nota: 'A luz branca entra inteira e sai repartida em cores.' },
  faraday: { tipo: 'foto', arquivo: 'faraday.webp', nome: 'Michael Faraday', legenda: '1791 – 1867', nota: 'Filho de ferreiro, aprendiz de encadernador, gênio do laboratório.' },
  davy: { tipo: 'foto', arquivo: 'davy.webp', nome: 'Humphry Davy', legenda: '1778 – 1829', nota: 'Químico, poeta e chefe de Faraday na Royal Institution.' },
  lovelace: { tipo: 'foto', arquivo: 'lovelace.webp', nome: 'Ada Lovelace', legenda: '1815 – 1852', nota: 'Aquarela de Alfred Edward Chalon, por volta de 1840.' },
  babbage: { tipo: 'foto', arquivo: 'babbage.webp', nome: 'Charles Babbage', legenda: '1791 – 1871', nota: 'Projetou um computador cem anos antes de existir eletrônica.' },
  micrographia: { tipo: 'foto', arquivo: 'micrographia.webp', nome: 'A pulga da Micrographia', legenda: '1665', nota: 'Robert Hooke desenhou o que via na lente — e assustou Londres.' },
  halley: { tipo: 'foto', arquivo: 'halley.webp', nome: 'Edmond Halley', legenda: '1656 – 1742', nota: 'Pagou do próprio bolso a impressão do Principia.' },
  herschel: { tipo: 'foto', arquivo: 'herschel.webp', nome: 'William Herschel', legenda: '1738 – 1822', nota: 'Músico de profissão, polia os próprios espelhos de telescópio.' },
  anning: { tipo: 'foto', arquivo: 'anning.webp', nome: 'Mary Anning', legenda: '1799 – 1847', nota: 'Retratada com o cão Tray e o martelo, nas falésias de Lyme Regis.' },
  harvey: { tipo: 'foto', arquivo: 'harvey.webp', nome: 'William Harvey', legenda: '1578 – 1657', nota: 'Provou a circulação do sangue com uma conta de aritmética.' },
  jenner: { tipo: 'foto', arquivo: 'jenner.webp', nome: 'Edward Jenner', legenda: '1749 – 1823', nota: 'Médico de interior, inventor da vacina.' },
  dalton: { tipo: 'foto', arquivo: 'dalton.webp', nome: 'John Dalton', legenda: '1766 – 1844', nota: 'Deu nome ao daltonismo ao descrever a própria visão.' },
  nightingale: { tipo: 'foto', arquivo: 'nightingale.webp', nome: 'Florence Nightingale', legenda: '1820 – 1910', nota: 'A dama da lâmpada — e uma das primeiras a governar por gráfico.' },
  foto51: { tipo: 'desenho', svg: FOTO51, nome: 'Foto 51', legenda: '1952', nota: 'O X que o DNA desenha quando atravessado por raios X.' },
  hodgkin: { tipo: 'desenho', svg: MOLECULA, nome: 'A penicilina, por dentro', legenda: '1945', nota: 'Os dois anéis colados que Dorothy Hodgkin mapeou com raios X.' },
  penicilina: { tipo: 'desenho', svg: PENICILINA, nome: 'A placa esquecida', legenda: '1928', nota: 'Em volta do mofo, um círculo limpo: ali nenhuma bactéria cresceu.' },
  enigma: { tipo: 'desenho', svg: ENIGMA, nome: 'O rotor da Enigma', legenda: '1939 – 1945', nota: 'Vinte e seis contatos e uma fiação embaralhada por dentro.' },
  'buraco-negro': { tipo: 'desenho', svg: BURACO_NEGRO, nome: 'O horizonte de eventos', legenda: '1974', nota: 'Onde o espaço entorta tanto que nem a luz volta.' },
  chimpanze: { tipo: 'foto', arquivo: 'chimpanze.webp', nome: 'O chimpanzé de Darwin', legenda: '1872', nota: 'Prancha de "A Expressão das Emoções no Homem e nos Animais".' },
  'royal-society': { tipo: 'foto', arquivo: 'royal-society.webp', nome: 'A Royal Society', legenda: '1660', nota: 'Frontispício da história da Sociedade, escrita por Thomas Sprat.' },
};
