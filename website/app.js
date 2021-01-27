/* Global Variables */
const generate = document.querySelector('#generate');
const description = document.querySelector('textarea');
const zipCode = document.querySelector('input');

//api const
const apiRootZip = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiRootQuery = 'http://api.openweathermap.org/data/2.5/weather?q=';
 
const apiKey = '&appid=9ba096bbf91......';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.' + d.getDate() + '.' + d.getFullYear();

generate.addEventListener('click', clickCallBack);

function clickCallBack() {
    //let desVal = description.value;
    let zipVal = zipCode.value;
    if (zipVal == '') {
        return;
    }
    let url = apiRootZip + zipVal + apiKey;
    //console.log(url);

    getWeather(url)
        .then(function(weatherData) {
            if (weatherData.cod == "200") {
               // const date = weatherData
                const temp = Math.floor(weatherData.main.temp - 273);
                const desc = weatherData.weather[0].description;
                //console.log(temp);
                //console.log(desc);
                postDataSend('/add', { temp, desc });

                updateContent(weatherData);
            }
             else
            {
                console.log("check zip");
            }
        })
}

// returns weatherData
async function getWeather(url) {
    const response = await fetch(url);
    const weatherData = await response.json();
  //  console.log(weatherData);
    return weatherData;
}

/* Function to POST data */
async function postDataSend(url, weatherData) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(weatherData)
    });
}

const temp = document.getElementById('temp');
const date = document.getElementById('date');
//const place = document.getElementById('location');
const content = document.getElementById('content');

function updateContent(weather) {
   // console.log(weather);
    date.innerHTML =  newDate;
    temp.innerHTML = 'temp in *C: ' + Math.floor(weather.main.temp - 273);
    content.innerHTML = 'description: ' + weather.weather[0].description;;
}