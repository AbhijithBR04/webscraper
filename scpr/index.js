const request = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");

async function main() {
  const html = await request.get(
    "https://reactnativetutorial.net/css-selectors/lesson6.html"
  );
  fs.writeFileSync("./test.html", html);
  const $ = cheerio.load(html);
  //to get multiple tags (use different html ie,lesson 2)
  // $("h2").each((index,element)=>{
  //     console.log($(element).text())
  // })

  //to get data with class id
  //   const red = $("#red").text();
  //   console.log(red);

  //to get multiple class elements lesson 5
  //   $(".red").each((index, element) => {
  //     console.log($(element).text());
  //   });

  //to get data using an attribute of a tag lesson 6
  //   const att=  $('[ data-customer="22293"]').text()
  //     console.log(att)
}

main();
