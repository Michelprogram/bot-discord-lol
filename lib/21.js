const fetch = require('node-fetch')
const jsdom = require('jsdom')

const fs =require('fs')

const get_21 = async () =>{
    const request = 'https://www.dogpile.com/serp?q=voiture'
    let html_code = await fetch(request)
    html_code = await html_code.text()

    fs.writeFile('test.html',html_code,(err)=>err)

    const dom = new jsdom.JSDOM(html_code).window.document

    const container_div_image = dom.querySelector('div.images-bing')

    console.log(container_div_image)

}

get_21()