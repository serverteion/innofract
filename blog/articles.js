/**
 * innofract - Blog Articles
 * Shared list of all blog articles.
 * To add a new article, append an object to the ARTICLES array
 * with the same fields and place the HTML file under /blog.
 */

const ARTICLES = [
  {
    id: "001-homepage-launch",
    slug: "homepage-launch",
    title: "レーベルのホームページを作りました。",
    author: "Supire",
    date: "2026-08-08",
    excerpt: "innofractの公式ホームページを発表しました。3月のレーベル立ち上げから半年、自分のコミュニティを持つという夢が叶いました。DTMの実験場として、ジャンルに縛られず面白いアイデアを発表できるプラットフォームを目指します。",
    file: "001-homepage-launch.html",
    length: 8,
    tone: "Announcement",
    colorSeed: "homepage-launch"
  }
];

window.ARTICLES = ARTICLES;
