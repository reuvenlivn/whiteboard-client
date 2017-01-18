import {Shape} from './Shape'
import {Picture} from './Picture'

export class Triangle extends Shape {
    
        // xE: number ;
        // yE: number ;
        // base: number ;
        // height: number ;
        // color: string ;
        // shape: string ;
        
        constructor(x, y, xE, yE, color, shape ) {
            super(x, y);
            this.xE = xE ;
            this.yE = yE ;
            this.base = xE - x ;
            this.height = yE - y ;
            this.color = color ;
            this.shape = shape ;
        }
        
    draw() {
        let ctx = Picture.getCtx();
        ctx.fillStyle = this.color ;
        ctx.beginPath();
        ctx.moveTo(this.x + this.base/2, this.y );
        ctx.lineTo(this.x, this.y + this.height );
        ctx.lineTo(this.x + this.base, this.y + this.height );
        ctx.closePath();
        ctx.fill();
        // ctx.stroke();
    }     
}
