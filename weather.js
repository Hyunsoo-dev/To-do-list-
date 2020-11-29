const $weatherLocation = document.querySelector('.weatherLocation');
const $status = document.querySelector('.status');
const $location = document.querySelector('.location');
const $weather = document.querySelector('.weather');
const $temp = document.querySelector('.temp');

const apiKey = '6ba138ee811dda538908b3fe6e3bae00';


if(!navigator.geolocation) {
  alert('navigator error');
} else {
  navigator.geolocation.getCurrentPosition(success);
}
function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  
  getWeather(lat, lon);
}

function getWeather(lat, lon) {
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
.then(function (resp) {
 //Response를 JSON형태로 파싱 	
  return resp.json()
})
.then(function (json) {
 //JSON형태로 파싱된 결과가 객체화되어 매개변수 json으로 들어온다. 
 //json을 활용할 수 있다.
  renderWeather(json);
  
}).catch(function () {
 //요청이 완료되지 못한 경우 catch()가 실행된다.
  
});
}

function renderWeather(json) {
  const $location = document.createElement('div');
  const $weather = document.createElement('div');
  const $temp = document.createElement('div');
  
  $location.classList.add('location');
  $weather.classList.add('weather');
  $temp.classList.add('temp');

  $location.textContent = json.name;
  $weather.textContent = json.weather[0].main
  $temp.textContent = json.main.temp - 273.15 + 'º';

  $weatherLocation.append($location, $weather, $temp);
}