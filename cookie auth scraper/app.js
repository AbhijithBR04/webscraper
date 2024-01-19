// const request = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");

// async function main() {
//   const html = await request.get(
//     "https://www.nordstrom.com/?origin=tab-logo"
//   );
//   fs.writeFileSync("./test2.html", html);
//   const $ = cheerio.load(html);

//   $("span").each((index,element)=>{
//       console.log($(element).text())
//   })
// }

// main()

const request = require("request-promise").defaults({
    headers: {
      Authorization: "apikey 8ea31c48-95c3-4bcf-9db1-d6ada47565f2",
      NordApiVersion: 1
    }
  });
  
  async function scrape() {
    const url =
      "https://query.ecommerce.api.nordstrom.com/api/queryresults/keywordsearch/?top=10&IncludeFacets=false&Keyword=red%20dresses";
    const json = await request.get(url);
  }
  
  scrape();