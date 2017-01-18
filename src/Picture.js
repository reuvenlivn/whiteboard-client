// import {Shape} from './Shape'
import {Rect} from './Rect'
import {Triangle} from './Triangle'
import {Circle} from './Circle'
import * as $ from 'jquery'
import io from 'socket.io-client' 

const canvasElSelector = '#oopCanvas';

// var  = io.connect('http://localhost:3333')

export class Picture {
    
    // static canvas;
    // static ctx;

    constructor() {
        this.shapes = [];  
//        window.shapes = this.shapes;
        this.drawPic()     
    }
    
    static savePicToStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    } 


    static getPicFromStorage(key) {
        var str = localStorage.getItem(key);
        return JSON.parse(str);
    } 
       

    parseStringsToShapes() {
        this.shapes.forEach( s => {
            this.createShape(s.shape, s.x, s.y, s.xE, s.yE, s.color);
        });
        for ( let i = 0 ; i < this.shapes.length ; i++ ) this.shapes.shift(); 
    }

       
    static getCtx() {
        if (Picture.ctx) return Picture.ctx;
        Picture.canvas   = document.querySelector(canvasElSelector);
        Picture.ctx      =  Picture.canvas.getContext("2d");
        return Picture.ctx;
    }
     
    
    drawShape(selShape, xS, yS, xE, yE, color) {
        xS -= Picture.canvas.offsetLeft ;
        xE -= Picture.canvas.offsetLeft ;
        yS -= Picture.canvas.offsetTop ;
        yE -= Picture.canvas.offsetTop ;  
        this.removeLastShape();
        this.createShape(selShape, xS, yS, xE, yE, color);
        this.shapes[this.shapes.length-1].draw();
        return this.shapes[this.shapes.length-1] ;
    }
    
     
    createShape(selShape, xS, yS, xE, yE, color) {
        let createdShape; // = {type: selShape, xS, yS, xE, yE, color};
        switch (selShape) {
            case 'rect':
                createdShape = new Rect(xS, yS, xE, yE, color, selShape);
                break;
            case 'triangle':
                createdShape = new Triangle(xS, yS, xE, yE, color, selShape);
                break;
            case 'circle':
                createdShape = new Circle(xS, yS, xE, yE, color, selShape);
                break;
            default:
                break;
        }
       // this.shapes.push(createdShape);
        this.addShape(createdShape);
    }
        
    
    removeLastShape() {
        this.shapes.pop()
        this.drawPic();
    }
    
       
    addShape(shape) {
        this.shapes.push(shape);
    }
    
       
    drawPic() {   
       Picture.getCtx().clearRect(0, 0, Picture.canvas.width, Picture.canvas.height); 
        this.shapes.forEach((shape, i) => {
            shape.draw() ; 
        });
    }
      
    
    clearAll() {
        this.shapes = [];
    }  
}
    