const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Listing = require("./model/Listing");

async function connectiondb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/webscraper").then(() => {
    console.log("connected to mongoDB");
  });
}

async function scarpListings(page) {
  await page.goto(
    "https://bangalore.craigslist.org/search/jjj#search=1~thumb~0~93"
  );

  await page.waitForSelector(".cl-search-result");

  const html = await page.content();
  const $ = cheerio.load(html);

  const listings = $(".cl-search-result")
    .map((index, element) => {
      const titleElement = $(element).find(".posting-title");
      const dateElement = $(element).find("span[title]");
      const suppElement = $(element).find(".meta");

      const title = $(titleElement).text();
      const url = $(titleElement).attr("href");
      const date = $(dateElement).attr("title");
      const support = $(suppElement).text();

      return { title, url, date, support };
    })
    .get();
  return listings;
}

async function setlistjobs(listings, page) {
  for (var i = 0; i < listings.length; i++) {
    await page.goto(listings[i].url);
    const html = await page.content();
    const $ = cheerio.load(html);
    const jobdesc = $("#postingbody").text();
    const compe = $("p.attrgroup > span:nth-child(1) > b").text();
    listings[i].jobdesc = jobdesc;
    listings[i].compe = compe;
    console.log((listings[i].jobdesc = jobdesc));
    console.log((listings[i].compe = compe));
    const listingModel = new Listing(listings[i]);
    await listingModel.save();
    await sleep(3000);
  }
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main() {
  await connectiondb();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const listings = await scarpListings(page);
  const listjobs = await setlistjobs(listings, page);
  console.log(listings);
}

main();
