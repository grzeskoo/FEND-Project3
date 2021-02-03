/* Global Variables */
const generate = document.querySelector('#generate');
const description = document.querySelector('textarea');
const zipCode = document.querySelector('input');
const feelings = document.getElementById('feelings');
 
//api const
const apiRootZip = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiRootQuery = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiunits = '&units='
const apiKey = '&appid=9ba096bbf916bed0f...';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

generate.addEventListener('click', clickCallBack);

function clickCallBack() {
    //let desVal = description.value;
    let zipVal = zipCode.value;
    if (zipVal == '') {
        return;
    }

    let unitsInput = document.querySelector('input[name="units"]:checked').value;
   if(!unitsInput)
   {
    unitsInput ="metrics"
   }

    let url = apiRootZip + zipVal + apiunits + unitsInput + apiKey ;
  // console.log(url);

    getWeather(url)

        .then(function(weatherData) {
            if (weatherData.cod == "200") {
                // const date = weatherData
                const temp = Math.floor(weatherData.main.temp);
                const desc = weatherData.weather[0].description;
                const feel = feelings.value;

                postDataSend('/add', {
                        temp,
                        desc,
                        feel
                    })
                    .then(updateContent(unitsInput))
            } else {
                console.log("check zip");
                alert("please check ZIP code");
            }
        })
        .then()
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
const content = document.getElementById('content');
const yourFeelings =  document.getElementById('feelings');

/* Function to GET Project Data */
async function updateContent(unitsInput) {
    const response = await fetch('/retrieve');

    // Transform into JSON
    const dataValue = await response.json();

    console.log(dataValue)
    
    // Write updated data to DOM elements
     date.innerHTML = newDate;
     temp.innerHTML = 'temp: ' + Math.floor(dataValue.temp) + ' unit type:'+ ` ${unitsInput}`;
     content.innerHTML = 'description: ' + dataValue.desc;
     yourFeelings.innerHTML = 'your feelings: ' + dataValue.feelings;
     console.log(dataValue)
}