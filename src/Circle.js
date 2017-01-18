import {Shape} from './Shape'
import {Picture} from './Picture'

export class Circle extends Shape {
    
    // xE: number ;
    // yE: number ;
    // radius: number ;
    // color: string ;
    // shape: string ;

    constructor(x, y, xEndCoor, yEndCoor, color, shape ) {
        super(x, y);
        this.xE = xEndCoor ;
        this.yE = yEndCoor ;
        this.radius = Math.sqrt( Math.pow((xEndCoor-x),2) + Math.pow((yEndCoor-y),2) ) ;
        this.color = color ;
        this.shape = shape ;
    }
    
    draw() {
        let ctx = Picture.getCtx();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color ;
        ctx.fill();
    }  
}
