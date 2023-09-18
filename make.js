let STARIMAGES = []
const imageSize = 1000;
let STATE = {
    'isSettingOpen':true,
    'isAreaDragging':false,
    'isAreaShown':false //<TEMP>
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

function isOnCanvas(x, y) {
    if(!STATE['isSettingOpen']) return true;
    const elemnt = document.elementFromPoint(x, y);
    console.log(elemnt)
    if(elemnt.id == "defaultCanvas0") return true;
    return false;
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
    starLayer = createGraphics(windowWidth, windowHeight); 
    strokeWeight(0);
    fill(255,255,255)
    imgLoad();
}

function imgLoad() {
    STARIMAGES.push(null)
    for(i = 1; i < 7; i++) {
        path = `http://127.0.0.1:5500/star-img/w_${i}.png`;
        STARIMAGES.push(loadImage(path)); 
    }
}

(function() {
    const settingWrap = document.getElementById('settingWrap');
    document.getElementById('hideToggle').addEventListener('click', (e) => {
        if(STATE['isSettingOpen']) {
            settingWrap.classList.remove('visible');
            settingWrap.classList.add('hidden');
            e.target.classList.add('fa-flip-horizontal');
        } else {
            settingWrap.classList.remove('hidden');
            settingWrap.classList.add('visible');
            e.target.classList.remove('fa-flip-horizontal');
        }
        STATE['isSettingOpen'] = !STATE['isSettingOpen'];
    });
})()

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

let hoverElement = null;
function mouseMoved() {
    hoverElement = document.elementFromPoint(mouseX, mouseY);
}

function clearArea() {
    putStar.classList.remove('available');
    putStar.classList.add('unavailable');
    STATE['isAreaShown'] = false;
}

let squareArea = [0,0,0,0]; //sX,sY,eX,eY
function mousePressed() {
    if(addMode.value == "click") {
        if(hoverElement.id == "defaultCanvas0") {
            addStar(mouseX, mouseY, document.getElementById('brightness').value);
        }
    } else if(addMode.value == "area") {
        if(hoverElement.id == "defaultCanvas0") {
            STATE['isAreaDragging'] = true;
            if(STATE['isAreaShown']) {
                clearArea();
            }
            areaLayer = createGraphics(windowWidth, windowHeight);
            areaLayer.noFill();
            areaLayer.stroke(140,140,140);
            areaLayer.strokeWeight(1);
            areaLayer.clear();
            clear();
            image(starLayer,0,0);
            squareArea[0] = mouseX;
            squareArea[1] = mouseY;
        }
    }
}

function mouseDragged() {
    if(addMode.value == "area") {
        if(STATE['isAreaDragging']) {
            areaLayer.clear();
            clear();
            areaLayer.rect(squareArea[0],squareArea[1],mouseX - squareArea[0],mouseY - squareArea[1]);
            image(areaLayer, 0 ,0);
            image(starLayer,0,0);
        }
    }
}

function mouseReleased() {
    if(addMode.value == "area") {
        if(!STATE['isAreaShown'] && STATE['isAreaDragging']) { //If the area is being shown when the mouse releases, that means that you didn't press on the canvas before that.
            squareArea[2] = mouseX;
            squareArea[3] = mouseY;
            if(squareArea[0] != squareArea[2] && squareArea[1] != squareArea[3]) {
                STATE['isAreaDragging'] = false;
                STATE['isAreaShown'] = true;
                putStar.classList.remove('unavailable');
                putStar.classList.add('available');
            } else {
                clearArea();
            }
        }
    }
}

const starNumber = document.getElementById('starNumber');
const rb = document.getElementById('rb');
const putStar = document.getElementById('putStar');
function putStarInArea() {
    if(STATE['isAreaShown']) {
        if (rb.checked) {
            for(i = 0; i < Number(starNumber.value); i++ ){
                const x = Math.random() * (squareArea[2] - squareArea[0]) + squareArea[0];
                const y = Math.random() * (squareArea[3] - squareArea[1]) + squareArea[1];
                const brightness = Math.floor(Math.random()*(7))
                addStar(x, y, brightness);
            }
        } else {
            for(i = 0; i < Number(starNumber.value); i++ ){
                const x = Math.random() * (squareArea[2] - squareArea[0]) + squareArea[0];
                const y = Math.random() * (squareArea[3] - squareArea[1]) + squareArea[1];
                const brightness = document.getElementById('brightness').value;
                addStar(x, y, brightness)
            }
        }
        clearArea();
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

