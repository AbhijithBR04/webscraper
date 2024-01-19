const request=require('request-promise')
const fs=require('fs')


async function gethtml(url){
    const html=await request.get(url)
    return html
}

function savehtmlToFile(html){
    fs.writeFileSync('./test.html',html)
}

async function main(){
    const html= await gethtml('https://bangalore.craigslist.org/search/jjj#search=1~thumb~0~93')
    savehtmlToFile(html)
}
main()