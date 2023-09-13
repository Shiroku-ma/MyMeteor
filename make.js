let star_white = [];
const imageSize = 1000;

function setup() {
    let canvas = createCanvas(windowWidth - 165, windowHeight);
    canvas.parent('canvas');
    strokeWeight(0);
    fill(255,255,255)
    imgLoad();
}

function imgLoad() {
    for(i = 1; i<=6;i++) {
        path = `http://127.0.0.1:5500/star-img/w_${i}.png`;
        star_white.push(loadImage(path)); 
    }
}

function mouseClicked(){
    if(mouseX > 0) {
        b = brightness.value;
        if(b == 1) {
            rect(mouseX, mouseY, 1, 1);
        } else {
            image(star_white[b - 2], mouseX-imageSize/2, mouseY-imageSize/2);
        }
    }
}
