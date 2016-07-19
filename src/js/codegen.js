'use strict';

/* Import dependencies */

/* Import custom JS */
import {Canvas} from "./canvas";
import {Helper} from "./helpers";
import {Hash}   from "./hash";
import {Circle} from "./circle";

const canvas = new Canvas(300, "myCanvas");
const helper = new Helper();
const hash = new Hash();

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

        this .pixelRatio = helper.getDevicePixelRatio();
    }
    create(){
        // console.log(hash.encrypt());
        canvas.createCircleBg();

        /* (x, y, radius, start, end) //// ctx.arc(50, 50, 50, 0*Math.PI ,1.5*Math.PI); */
        var j = 0,
        k = 0;
        for (j = 0; j < this.angleNumber; j++){
            /* Start for every stroke */
            var strokeStart = this.angleCount * (j+1) * Math.PI
            //console.log('ANGLE '+ angleCount  * (j+1));
            for(k = 0; k < this.lines; k ++){
                /* Determine position from center */
                /* We put 2 to get 1 (first value) and a space for the image */
                var strokeRadius = (k+2) * this.radiusStep;
                /* Give the value in the Digits array */
                var currentValue = this.digits[(j * this.lines) + (k)];
                /* End of the stroke (StrokeStart + length of stroke)*/
                var strokeEnd = (strokeStart + (currentValue * (this.angleCount / 10 )) * Math.PI );

                canvas.creatArc(strokeRadius, strokeStart, strokeEnd);
            }
        }

        canvas.createImageArc('https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-1/p320x320/13445251_10208356195196471_1781558187916504694_n.jpg?oh=4fbd5c7db4a91bd953829e4d060bd6d5&oe=57F7856B', 30);
        document.querySelector(".codeGen").appendChild(canvas.ctx.canvas);

        var circle = new Circle(canvas.ctx.canvas);

    }
}
