const fetch = require('node-fetch')
const jsdom = require('jsdom')


const get_Runes = async (champion,poste) =>{
    const request = `https://euw.op.gg/champion/${champion}/statistics/${poste}`
    let html_code = await fetch(request)
    html_code = await html_code.text()

    const dom = new jsdom.JSDOM(html_code).window.document

    const table = dom.querySelector('.ChampionKeystoneRune-1')
	const tr = table.firstElementChild
	const perk = tr.children[0].children[0]

    const rune1_img = [...perk.children[0].querySelectorAll('div .perk-page__item--active > div > img')].map(el=>el.src)

    const rune2_img = [...perk.children[2].querySelectorAll('div > div .perk-page__item--active > div > img')].map(el=>el.src)

    const fragment = [...perk.children[4].querySelectorAll('div > div > div > img.active')].map(el=>el.src)

    return {
        rune_1 : rune1_img,
        rune_2 : rune2_img,
        fragment : fragment
    }
    
}

//get_Runes('leblanc','mid').then(data=>console.log(data))

const ty = "leblanc"

console.log(ty[0].toUpperCase())
