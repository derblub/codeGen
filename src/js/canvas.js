export class Canvas{
    creatArc(ctx, canvasOrigin, strokeRadius, strokeStart, strokeEnd){
        ctx.beginPath();
        ctx.arc(canvasOrigin, canvasOrigin, strokeRadius, strokeStart, strokeEnd);
        ctx.stroke();
        ctx.closePath();
    }
    createImageArc(ctx, imgSrc, sizeImg, canvasOrigin){
        var thumbImg = document.createElement('img');
        thumbImg.src = imgSrc;
        thumbImg.onload = function() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(canvasOrigin, canvasOrigin, sizeImg, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(thumbImg, canvasOrigin - sizeImg, canvasOrigin - sizeImg, sizeImg * 2, sizeImg * 2);
        };
    }
}
