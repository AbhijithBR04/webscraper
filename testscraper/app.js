//csv saving
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const ObjectsToCsv = require('objects-to-csv');

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://bangalore.craigslist.org/search/jjj#search=1~thumb~0~93"
  );

  //   Waits for the page to load and for an element with the class name ".cl-search-result" to become available.
  // This ensures that the content you want to scrape is present on the page
  await page.waitForSelector(".cl-search-result");

  //   Retrieves the HTML content of the page.
  const html = await page.content();
  const $ = cheerio.load(html);

  //   $(".posting-title").each((index, element) => console.log($(element).text()));
  //   $(".posting-title").each((index, element) => console.log($(element).attr("href")));

  const result = $(".cl-search-result")
    .map((index, element) => {
      const titleElement = $(element).find(".posting-title");
      const dateElement = $(element).find("span[title]");
      const suppElement = $(element).find(".meta");

      const title = $(titleElement).text();
      const url = $(titleElement).attr("href");
      const date = $(dateElement).attr("title");

      //to get the remining text elements of a job
      const support=$(suppElement).text()

      return { title, url, date ,support };
    })
    .get();
    const csv = new ObjectsToCsv(result);
    // Save to file:
    await csv.toDisk('./test.csv');
  console.log(result);
}

main();