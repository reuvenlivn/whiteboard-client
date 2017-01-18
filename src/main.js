import './style.scss';
import {Picture} from './Picture';
import $ from 'jquery';
import io from 'socket.io-client'

let xStart;
let yStart;
let xEnd;
let yEnd;
let color = 'black';
let shape = 'rect';
const pic = new Picture();
let newShape ;
let socket ;


function addShapeObj(shapeObj){
    console.log('addShapeObj',shapeObj); 
    pic.createShape(
      shapeObj.shape,
      shapeObj.x,
      shapeObj.y,
      shapeObj.xE,
      shapeObj.yE,
      shapeObj.color
    );
    pic.drawPic() ;     
};


$(document).ready(function () {
    // to init the canvas
    loadPic;        
    document.querySelector('#oopCanvas')
        .addEventListener('mousedown', clickDown, false);

    document.querySelector('#oopCanvas')
        .addEventListener('mouseup', clickUp, false);

    document.querySelector('.clearLast')
        .addEventListener('click', deleteLastShape, false);

    document.querySelector('.clear')
        .addEventListener('click', function () {
                                        pic.clearAll(); 
                                        pic.drawPic()
                                   }, false);  

    document.querySelector('.save')
        .addEventListener('click', function () {
                                        Picture.savePicToStorage('pic', pic.shapes)
                                    }, false);

    document.querySelector('.load')
        .addEventListener('click', function () {
                                        loadPic('pic')
                                    }, false);

    document.querySelector('.colorPicker')
        .addEventListener('change', function(){
                                        changeColor()
                                    }, false);

    $('input[type="radio"]')
        .click(function () {shape = $(this).val() });

    socket = io.connect('http://localhost:3333');
    
    socket.on('collabwb msg', jsonShape => {
      addShapeObj(JSON.parse(jsonShape));
    } );

});

let clickDown = function getStartCoor(e) {
    console.log('getStartCoor'); 
    xStart = e.clientX ;
    yStart = e.clientY ;
    console.log(xStart, yStart);   
    document.querySelector('#oopCanvas').addEventListener('mousemove', mouseMove, false);
}


let mouseMove = function showCurrShape(e) {
    xEnd = e.clientX ;
    yEnd = e.clientY ;
    newShape = pic.drawShape(shape, xStart, yStart, xEnd, yEnd, color);
}


// mouseup
let clickUp = function getEndCoor(e) {
    console.log('getEndCoor'); 
    pic.addShape(newShape);
    socket.emit('collabwb msg', JSON.stringify(newShape));
    document.querySelector('#oopCanvas').removeEventListener('mousemove', mouseMove, false);
    console.log('pic',pic);
}


function changeColor() {
//    let elCP = <HTMLInputElement>document.querySelector('.colorPicker');
    let elCP = document.querySelector('.colorPicker');
    console.log('elCP:',elCP);
    
    elCP.setAttribute('value', elCP.value ) ;
    color = elCP.getAttribute('value');
    console.log('color:',color);
}


let deleteLastShape = function() {
    $('.clearLast').addClass('removing');
    pic.removeLastShape()
    $('.clearLast').removeClass('removing');
}


let loadPic = function(key) {
    pic.shapes = Picture.getPicFromStorage(key);
    pic.parseStringsToShapes();
    console.log(pic.shapes);
    pic.drawPic();    
}

