const request = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");

async function main() {
  const html = await request.get(
    "https://kerala.craigslist.org/"
  );
  fs.writeFileSync("./test2.html", html);
  const $ = cheerio.load(html);

  $("span").each((index,element)=>{
      console.log($(element).text())
  })

  //to get data with class id
  //   const red = $("#red").text();
  //   console.log(red);

  //to get multiple class elements lesson 5
    // $(".txt").each((index, element) => {
    //   console.log($(element).text());
    // });

  //to get data using an attribute of a tag lesson 6
  //   const att=  $('[ data-customer="22293"]').text()
  //     console.log(att)
}

main();
