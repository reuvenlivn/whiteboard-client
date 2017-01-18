import {Shape} from './Shape'
import {Picture} from './Picture'

export class Rect extends Shape {

    constructor( x, y, xEndCoor, yEndCoor, color, shape ) {
        super( x, y );
        this.xE = xEndCoor ;
        this.yE = yEndCoor ;
        this.width = xEndCoor-x ;
        this.height = yEndCoor-y ;
        this.color = color ;
        this.shape = shape ;
    }
    
    draw() {
        let ctx = Picture.getCtx(); 
        ctx.fillStyle = this.color ;
        ctx.fillRect(this.x, this.y, this.width, this.height );
    }    
}