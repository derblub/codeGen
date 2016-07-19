'use strict';

/* Dependencies */

/* Constant */

export class Circle{
    constructor(element) {
        this.colors = ["#33414A", "#3A5998", "#70B8F2", "#68C584", "#4BB7CB", "#9C8DD9", "#FB8FC8", "#F15B4E", "#F2A533"];
        this.element = element;
        this.maxDeg = 30;
        element.addEventListener("click", (e) => {
            this.functionCaller(e);
        });
    }

    functionCaller(e){
        this.createCircle(e);
        this.rotateCircle(e);
    }

    createCircle(evt) {
        /* Create element for the circle */
        this.el = document.createElement('div');
        this.el.className = "circle";
        this.el.style.left = evt.clientX + "px";
        this.el.style.top = evt.clientY + "px";
        this.el.style.backgroundColor = this.colors[Math.floor(Math.random()*this.colors.length)];;
        document.body.appendChild(this.el);
        setTimeout(() => this.addClass(this.el), 10);
    }

    addClass(el){
        el.className += " big"
    }

    rotateCircle(evt) {
        this.canvasElement = document.getElementById("myCanvas");

        /*
            Click position - middle of X/Y -> If negative (left/top)
        */
        this.elementClickX = evt.clientY - (window.innerHeight / 2);
        this.elementClickY = evt.clientX - (window.innerWidth / 2);


        /* Pourcent based on elementClickX & elementClickY  */
        this.pourcentX = this.elementClickX / (this.element.clientWidth / 2);
        this.pourcentY = this.elementClickY / (this.element.clientWidth / 2);

        /* Fix the problem of X/Y rotating */
        if(this.pourcentY < 0){
            this.pourcentY = Math.abs(this.pourcentY);
        }else{
            this.pourcentY = -Math.abs(this.pourcentY);
        }

        this.canvasElement.style.transform = "perspective( 50px ) rotateX("+ this.pourcentX * this.maxDeg  +"deg) rotateY("+ this.pourcentY * this.maxDeg +"deg)";
        setTimeout(() => this.resetRotate(this.canvasElement), 100);
    }
    resetRotate(el){
        el.style.transform = "perspective( 600px ) rotateX(0deg) rotateY(0deg)";
    }
}
