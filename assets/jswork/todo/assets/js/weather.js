const weather = document.querySelector(".js-weather");

const API_KEY = "402754fb1ee1a9b56bcc449b8b0f18eb";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(reponse){
        return reponse.json();
        //fetch가 완료되어 서버로부터 데이터가 들어올 때까지 기다린후 다음작업을 지시해야 하므로 then 사용.
        //weather.js:6 Promise {<pending>} : 대기상태
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
    //fetch안에는 가져올 데이터를 넣으면 됨.
   
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
        //객체의 변수이름과 key 이름을 같게 저장할 때는 하나로 써도 됨.
        //원래는 latitude : latutude, longitude : longitude
        
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
    console.log(position);
}

function handleGeoError(){
    console.log("위치 정보를 확인할 수 없습니다.");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    } else {
        //getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log(parseCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();