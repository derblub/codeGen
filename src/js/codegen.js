'use strict';

import {Canvas} from "./canvas";

const canvas = new Canvas();

export class CodeGen{
    constructor(){
        /* Create a random number -> Should change with a hash system */
        this.number = Math.floor(Math.random()*1E15);
        /* Give the number of sections you want */
        this.angleNumber = 3;
        /* Split the number to Array */
        this.digits = (""+this.number).split("");
        /* Get the number of lines you want */
        this.lines = this.digits.length / this.angleNumber;
        /* Circle begin at 0 (3 o'clock position) and finish at 2 */
        this.angleCount = 2 / this.angleNumber;
        /* Determine the Radius step */
        this.radiusStep = 20;
    }
    create(){
        /* Create the magic stuff -- Canvas */

        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        /*
        Get width of the canvas, we do not need the height because it's a square
        Get the center of canvas -> width / 2
        */
        var canvasOrigin = (c.width) / 2;
        /* Color of the stroke */
        ctx.strokeStyle = '#F18C6B';
        /* Width of lines */
        ctx.lineWidth = 4;
        /* Cap of lines */
        ctx.lineCap = 'round';

        /* Create a circle behind the canvas */
        ctx.beginPath();
        ctx.fillStyle="#3F374D";
        ctx.arc(canvasOrigin, canvasOrigin, canvasOrigin, 0, Math.PI * 2, false);
        ctx.fill();


        /* (x, y, radius, start, end) //// ctx.arc(50, 50, 50, 0*Math.PI ,1.5*Math.PI); */
        var j = 0,
        k = 0;
        for (j = 0; j < this.angleNumber; j++){
            /* Start for every stroke */
            var strokeStart = this.angleCount * (j+1) * Math.PI
            //console.log('ANGLE '+ angleCount  * (j+1));
            for(k = 0; k < this.lines; k ++){
                /* Determine position from center */
                var strokeRadius = (k+2) * this.radiusStep;
                /* Give the value in the Digits array */
                var currentValue = this.digits[(j * this.lines) + (k)];
                /* End of the stroke (StrokeStart + length of stroke)*/
                var strokeEnd = (strokeStart + (currentValue * (this.angleCount / 10 )) * Math.PI );

                canvas.creatArc(ctx, canvasOrigin, strokeRadius, strokeStart, strokeEnd);
            }
        }

        canvas.createImageArc(ctx, 'https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-1/p320x320/13445251_10208356195196471_1781558187916504694_n.jpg?oh=4fbd5c7db4a91bd953829e4d060bd6d5&oe=57F7856B', 30, canvasOrigin);
    }
}
