const fetch = require('node-fetch')
const jsdom = require('jsdom')

const get_Runes = async (champion,poste) =>{
    const request = `https://euw.op.gg/champion/${champion}/statistics/${poste}`
    let html_code = await fetch(request)
    html_code = await html_code.text()

    const dom = new jsdom.JSDOM(html_code).window.document
    const new_link = (link) => "http:"+link.src.split('?')[0] 

    const table = dom.querySelector('.ChampionKeystoneRune-1')
	const tr = table.firstElementChild
	const perk = tr.children[0].children[0]

    const img_champ = "http:"+dom.querySelector('.champion-stats-header-info__image > img').src.split('?')[0]

    const rune1_img = [...perk.children[0].querySelectorAll('div .perk-page__item--active > div > img')].map(el=>new_link(el))

    const rune2_img = [...perk.children[2].querySelectorAll('div > div .perk-page__item--active > div > img')].map(el=>new_link(el))

    const fragment = [...perk.children[4].querySelectorAll('div > div > div > img.active')].map(el=>new_link(el))

    return {
        img_champ : img_champ,
        rune_1 : rune1_img,
        rune_2 : rune2_img,
        fragment : fragment
    }
    
}

module.exports = get_Runes

//get_Runes('leblanc','mid').then(data=>console.log(data))
