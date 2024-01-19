const request = require("request-promise");
const cheerio = require("cheerio");

async function main() {
  for (let index = 0; index <= 3; index = index + 1) {
    const html = await request.get(
      "https://bangalore.craigslist.org/search/sss#search=1~list~0~0" + index
    );
    const $ = await cheerio.load(html);
    $(".posting-title").each((index, element) => console.log($(element).text()));
    console.log("indexing at "+ index)
  }
}
main();
