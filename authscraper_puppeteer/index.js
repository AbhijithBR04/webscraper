const pups=require("puppeteer")
const cheerio=require('cheerio')

async function main(){
    try {
        const browser= await pups.launch({headless:false})
        const page=await browser.newPage()
        await page.goto('https://accounts.craigslist.org/login')
        await page.type("input#inputEmailHandle","abhijithbhadran1441@gmail.com")
        await page.type("input#inputPassword","=/3@?xqL.=t*6!G")
        await page.click("button#login")
        await page.waitForNetworkIdle()
        await page.goto('https://accounts.craigslist.org/login/home?show_tab=drafts')
        
        const content=await page.content()
        const $= await cheerio.load(content)
        console.log($('body > article > section > fieldset').text())
    } catch (error) {
        console.log(error)
    }
}  
main()