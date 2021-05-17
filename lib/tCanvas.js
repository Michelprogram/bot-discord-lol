const { createCanvas,loadImage } = require('canvas')

class Canvas_Draw{
    constructor(){
        this.canva = createCanvas(700,450)
        this.ctx = this.canva.getContext('2d')
        this.__init_canvas()
    }

    __init_canvas = () =>{
        this.ctx.fillStyle = "#2f3136"
        this.ctx.fillRect(0, 0, this.canva.width, this.canva.height)
    }

    __draw_img = async (link,x,y,res) =>{
        const img = await loadImage(link)
        this.ctx.drawImage(img,x,y,res,res)
    }

    draw_title = (name,poste) =>{
        const title = `Rune ${name[0].toUpperCase()} ${poste[0].toUpperCase()}`
        this.ctx.font ='40px sans-serif'
        this.ctx.fillStyle = "white"
        this.ctx.fillText(title,10,50)
    }

    draw_champ_img = async (url) =>{
        await this.__draw_img(url,550,10,100)
    }

    draw_runes = async (list,x) =>{
        let compteur = 100
        for(let i = 0;i<list.length;i++){
            await this.__draw_img(list[i],x,compteur,70)
            compteur += 90
        }
    }
}

module.exports = Canvas_Draw