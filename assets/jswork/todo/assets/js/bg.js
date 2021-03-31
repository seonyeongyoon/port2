const body = document.querySelector("body");


const IMG_NUMBER = 4;

function handleImgLoad(){
    console.log("finished loading");
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `assets/img/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
    image.addEventListener("loaded", handleImgLoad)
    
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;

}

function init(){
    const ramdomNumber = genRandom()
    paintImage(ramdomNumber)
}

init();

//Math.random() * 5 = 5까지의 숫자를 랜덤으로 보여주기
//Math.floor(3.7) = 소수점 내림 -> 3
//Math.ceil(3.9) = 소수점 올림 -> 4