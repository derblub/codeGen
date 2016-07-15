'use strict';

import {Helper} from "./helpers";

const helper = new Helper();

export class Canvas{
    constructor(size,id){

        this.pixelRatio = helper.getDevicePixelRatio();
        /* Create the magic stuff -- Canvas */
        var c = document.createElement('canvas');
        c.width = size * this.pixelRatio;
        c.height = size * this.pixelRatio;
        c.style.width =  size + "px";
        c.style.height = size + "px";
        c.id = id;

        this.ctx = c.getContext("2d");
        /*
        Get width of the canvas, we do not need the height because it's a square
        Get the center of canvas -> width / 2
        */
        this.canvasOrigin = (c.width) / 2;

        /* Color of the stroke */
        this.ctx.strokeStyle = '#FFFFFF';
        /* Cap of lines */
        this.ctx.lineCap = 'round';

    }
    creatArc(strokeRadius, strokeStart, strokeEnd){
        this.ctx.beginPath();
        this.ctx.arc(
            this.canvasOrigin,
            this.canvasOrigin,
            strokeRadius * this.pixelRatio,
            strokeStart,
            strokeEnd
        );
        this.ctx.lineWidth = 5 * this.pixelRatio;
        this.ctx.stroke();
        this.ctx.closePath();
    }
    createCircleBg(){
        /* Create a circle behind the canvas */
        this.ctx.beginPath();
        this.ctx.arc(this.canvasOrigin, this.canvasOrigin, this.canvasOrigin - (10 * this.pixelRatio), 0, Math.PI * 2, false);
        this.ctx.lineWidth = 10 * this.pixelRatio;
        this.ctx.stroke();
        this.ctx.fillStyle="#2D322E";
        this.ctx.fill();
    }
    createImageArc(imgSrc, sizeImg){
        var thumbImg = document.createElement('img');
        var cont = this;
        sizeImg = sizeImg * this.pixelRatio;
        thumbImg.src = imgSrc;
        thumbImg.onload = function() {
            cont.ctx.save();
            cont.ctx.beginPath();
            cont.ctx.arc(cont.canvasOrigin, cont.canvasOrigin, sizeImg, 0, Math.PI * 2, true);
            cont.ctx.closePath();
            cont.ctx.clip();
            cont.ctx.drawImage(thumbImg, cont.canvasOrigin - sizeImg, cont.canvasOrigin - sizeImg, sizeImg * 2, sizeImg * 2);
        };
    }
}
