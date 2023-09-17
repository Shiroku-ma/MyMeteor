let STARIMAGES = []
const imageSize = 1000;
let STATE = {
    'isOpen':true
}
let addMode = document.getElementById('addMode');
let areaLayer;
let starLayer;

let stars = [];
const Star = class {
    constructor(x, y, brightness) {
        this.x = x;
        this.y = y;
        this.brightness = brightness;
    }
};

let mouse = [0,0]; // This is the mouse position on the client screen, not on canvas.
window.addEventListener('click', (e) => {
    mouse[0] = e.clientX;
    mouse[1] = e.clientY;
});

function isOnSetting() {
    if(!STATE['isOpen']) return false;
    const elemnt = document.elementFromPoint(mouse[0], mouse[1]);
    console.log(mouse[0], mouse[1]);
    if(elemnt.id != "defaultCanvas0") return false;
    return true;
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
    starLayer = createGraphics(windowWidth, windowHeight); 
    strokeWeight(0);
    fill(255,255,255)
    imgLoad();
}

(function() {
    const settingWrap = document.getElementById('settingWrap');
    let isVisible = true;
    document.getElementById('hideToggle').addEventListener('click', (e) => {
        if(isVisible) {
            settingWrap.classList.remove('visible');
            settingWrap.classList.add('hidden');
            e.target.classList.add('fa-flip-horizontal');
        } else {
            settingWrap.classList.remove('hidden');
            settingWrap.classList.add('visible');
            e.target.classList.remove('fa-flip-horizontal');
        }
        isVisible = !isVisible;
    });
})()

function imgLoad() {
    STARIMAGES.push(null)
    for(i = 1; i < 7; i++) {
        path = `http://127.0.0.1:5500/star-img/w_${i}.png`;
        STARIMAGES.push(loadImage(path)); 
    }
}

let mouseStartX;
let mouseStartY;
let mouseEndX;
let mouseEndY;
let range = false;
function mousePressed() {
    if(addMode.value == "click") {
        clear();
        image(starLayer,0,0);
    }
    if(addMode.value == "area" && mouseX > 0) {
        areaLayer = createGraphics(windowWidth, windowHeight);
        areaLayer.noFill();
        areaLayer.stroke(140,140,140);
        areaLayer.strokeWeight(1);
        areaLayer.clear();
        clear();
        image(starLayer,0,0);
        mouseStartX = mouseX;
        mouseStartY = mouseY;
        if(range) {
            putStar.classList.remove('available');
            putStar.classList.add('unavailable');
            range = false;
        }
    }
}


function addStar(x,y,brightness) {
    stars.push(new Star(x,y,brightness));
    if(brightness == 0) {
        starLayer.rect(x, y, 1, 1);
    } else {
        starLayer.image(STARIMAGES[brightness], x-imageSize/2, y-imageSize/2);
    }
    clear();
    image(starLayer,0,0);
}

function mouseReleased() {
    if(addMode.value == "area" && mouseX > 0) {
        mouseEndX = mouseX;
        mouseEndY = mouseY;
        putStar.classList.remove('unavailable');
        putStar.classList.add('available');
        range = true;
    }
}

function mouseDragged() {
    if(addMode.value == "area" && mouseX > 0) {
        areaLayer.clear();
        clear();
        areaLayer.rect(mouseStartX,mouseStartY,mouseX - mouseStartX,mouseY - mouseStartY)
        image(areaLayer, 0 ,0);
        image(starLayer,0,0);
    }
}

function mouseClicked(){
    if(isOnSetting()) {
        if(addMode.value == "click") {
            addStar(mouseX, mouseY, document.getElementById('brightness').value);
        }
    }
}

const starNumber = document.getElementById('starNumber');
const rb = document.getElementById('rb');
const putStar = document.getElementById('putStar');
function putStarInArea() {
    if(range) {
        if (rb.checked) {
            for(i = 0; i < Number(starNumber.value); i++ ){
                const x = Math.random() * (mouseEndX - mouseStartX) + mouseStartX;
                const y = Math.random() * (mouseEndY - mouseStartY) + mouseStartY;
                const brightness = Math.floor(Math.random()*(7))
                addStar(x, y, brightness);
            }
        } else {
            for(i = 0; i < Number(starNumber.value); i++ ){
                const x = Math.random() * (mouseEndX - mouseStartX) + mouseStartX;
                const y = Math.random() * (mouseEndY - mouseStartY) + mouseStartY;
                const brightness = document.getElementById('brightness').value;
                addStar(x, y, brightness)
            }
        }
        putStar.classList.remove('available');
        putStar.classList.add('unavailable');
        range = false;
    }
}

const addToClick = document.getElementById('addToClick');
const addInArea = document.getElementById('addInArea');
addMode.addEventListener('change', (e) => {
    if(addMode.value == "click") {
        addToClick.style.display = "block";
        addInArea.style.display = "none";
    } else if(addMode.value == "area") {
        addToClick.style.display = "none";
        addInArea.style.display = "block";
    }
});

