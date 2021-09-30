"USE STRICT"
document.addEventListener('DOMContentLoaded', (event) => {


    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    let Cwidth = c.width;
    let Cheight = c.height;

    const CANT_FIG=30;

    let figures= [];
    let lastClickedFigure=null;
    let isMouseDown=false;

    function addFigure(){
        addCircle();
        drawFigure();
    }

    function drawFigure(){
        clearCanvas();
        for(let i=0;i<figures.length;i++){
            figures[i].draw();
        }
    }
    

    function addFigures(){
        addFigure();
        if(figures.length<CANT_FIG){
            setTimeout(addFigures,333);
        }
    }

    setTimeout(()=>{
        addFigures();
    },333);

    function addCircle(){
        let posX=Math.round(Math.random() * Cwidth);
        let posY=Math.round(Math.random() * Cheight);
        let color=randomRGBA();
        let circle=new Circle(posX,posY,10,color,ctx);
        figures.push(circle);
    }

    function findClickedFigure(x,y){
        for(let i=0;i<figures.length;i++){
            const element=figures[i];
            if(element.isPointInside(x,y)){
                return element;
            }
        }
    }

    c.addEventListener('mousedown',onmousedown,false);
    function onmousedown(e){
        isMouseDown=true;
        if(lastClickedFigure!=null){
            lastClickedFigure.setResaltado(false);
            lastClickedFigure=null;
        }
        let clickFig=findClickedFigure(e.layerX,e.layerY);
        if(clickFig!=null){
            clickFig.setResaltado(true);
            lastClickedFigure=clickFig;
        }
        drawFigure();
    }
    c.addEventListener('mouseup',onmouseup,false);
    function onmouseup(e){
        isMouseDown=false;
    }

    c.addEventListener('mousemove',onmousemove,false);
    function onmousemove(e){
        if(isMouseDown && lastClickedFigure !=null){
            lastClickedFigure.setPosition(e.layerX,e.layerY);
        }
        drawFigure();
    }

    function clearCanvas(){
        ctx.fillStyle='white';
        ctx.fillRect(0,0,Cwidth,Cheight);
        
    }


    function randomRGBA() {
        let r = Math.round((Math.random() * 255));
        let g = Math.round((Math.random() * 255));
        let b = Math.round((Math.random() * 255));
        let a = 255;
        return `rgba(${r},${g},${b},${a})`;
    }
});