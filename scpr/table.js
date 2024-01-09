// const request = require("request-promise");
// const fs = require("fs");
// const cheerio = require("cheerio");

// async function main() {
//   const html = await request.get(
//     "https://www.codingwithstefan.com/table-example/"
//   );
//   fs.writeFileSync("./tables.html", html);
//   const $ = cheerio.load(html);
//     const scrapedRows=[]
//   //   $("body > table > tbody > tr > td").each((index, element) => {
//   //     console.log($(element).text());
//   //   });



//   //   $("body > table > tbody > tr").each((index, element) => {
//   //     console.log($($(element).find("td")[0]).text());
//   //   }); or

//   $("body > table > tbody > tr").each((index, element) => {
//     const tds = $(element).find("td");
    
//     const company=$(tds[0]).text()
//     const contact=$(tds[1]).text()
//     const country=$(tds[2]).text()
//     const Rows={company,contact,country}
//     scrapedRows.push(Rows)
//   });
//   console.log(scrapedRows)
// }
// main();

//OR

const request = require("request-promise");
const cheerio = require("cheerio");

async function main() {
  const result = await request.get(
    "https://codingwithstefan.com/table-example"
  );
  const $ = cheerio.load(result);
  const scrapedRows = [];
  const tableHeaders = [];
  $("body > table > tbody > tr").each((index, element) => {
    if (index === 0) {
      const ths = $(element).find("th");
      ths.each((index, element) => {
        tableHeaders.push(
          $(element)
            .text()
            .toLowerCase()
        );
      });
      return true;
    }
    const tds = $(element).find("td");
    const tableRow = {};
    tds.each((index, element) => {
      tableRow[tableHeaders[index]] = $(element).text();
    });
    scrapedRows.push(tableRow);
  });
  console.log(scrapedRows);
}

main();