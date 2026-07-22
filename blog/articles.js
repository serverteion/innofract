/**
 * innofract - Blog Articles
 * Shared list of all blog articles.
 * To add a new article, append an object to the ARTICLES array
 * with the same fields and place the HTML file under /blog.
 */

const ARTICLES = [
  {
    id: "001-dofttia-yosa",
    slug: "dofttia-yosa",
    title: "「ドッちもよさ」についての考察",
    author: "k. (innofract)",
    date: "2026-07-10",
    excerpt: "innofract を貫く思想「どっちもよさ」は、ただふざけているだけではなかった。寒々しい深夜のチャットから漏れた一言が、いつの間にか私たちのロゴを突き刺していた。",
    file: "001-dofttia-yosa.html",
    length: 6,
    tone: "Essay",
    colorSeed: "dofttia"
  },
  {
    id: "002-tape-vs-digital",
    slug: "tape-vs-digital",
    title: "カセットテープ音源とデジタル音源の違い",
    author: "miyu",
    date: "2026-06-28",
    excerpt: "「温かみ」と「鮮明さ」の境界線はどこに引かれているのか。手元の Tascam と DAW を行き来しながら、違う靴を履いた同じ足音の話をする。",
    file: "002-tape-vs-digital.html",
    length: 8,
    tone: "Tech",
    colorSeed: "tape-digital"
  },
  {
    id: "003-ambient-as-glitch",
    slug: "ambient-as-glitch",
    title: "壊れた静寂：グループサウンドの裏で鳴る Ambient",
    author: "null0",
    date: "2026-07-19",
    excerpt: "扱いきれなかった Ambient のノートが、誤ってdrum & bass の裏で再生されてしまった夜がある。その事故は、私にとって3年ぶりに正解だった。",
    file: "003-ambient-as-glitch.html",
    length: 7,
    tone: "Field note",
    colorSeed: "ambient-glitch"
  }
];

window.ARTICLES = ARTICLES;
