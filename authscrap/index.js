const request = require("request-promise");
const fs=require('fs');

async function main() {
  try {
    const html = await request.post("https://accounts.craigslist.org/login",{
        form:{
            inputEmailHandle:"abhijithbhadran1441@gmail.com",
            inputPassword:'=/3@?xqL.=t*6!G'
        },
        headers:{
            Referer:"https://accounts.craigslist.org/login"
        },
        simple:false,
        followAllRedirects:true,
        jar:true
    });
    console.log(html)
    fs.writeFileSync("./login.html",html)
  } catch (error) {
    console.error(error)
  }
}
main();
