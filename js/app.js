const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const imgurl = document.querySelector('img.time');
const iconUrl = document.querySelector('.icon img')

const updateUI = (data) => {
    // const cityDets = data.city;
    // const weather = data.weather;
    // console.log(cityDets);
    // console.log(weather)
    console.log(data)
    //destructuring the needed properties from data object
    const {city, weather} = data;


    //update template
    details.innerHTML = `
        <h5 class="my-3">${city.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-5 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
    //remove d-none class if exists
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

    //update time image
    let timeUrl = null;

    weather.IsDayTime ? timeUrl = 'img/day.svg' : timeUrl ='img/night.svg';

    /**  let timeUrl = weather.IsDayTime ? timeUrl = 'img/day.svg' : timeUrl ='img/night.svg'; */

    imgurl.setAttribute('src', timeUrl) 

    //update icon with api icon 
    let { WeatherIcon } = weather
    iconUrl.setAttribute('src', `img/icons/${WeatherIcon}.svg`)
}

const updateCity = async (city) => {
    const cityData = await getCity(city);
    const weather = await getWeather(cityData.Key)

    return {
        city: cityData,
        weather: weather
    }
}

cityForm.addEventListener('submit', e => {
    //prevent defaul action
    e.preventDefault()

    const city  = cityForm.city.value.trim();
    cityForm.reset();
    localStorage.setItem('city', city)

    updateCity(city)
        .then((data) => updateUI(data))
        .catch((err) => console.log(err))
})

if(localStorage.getItem('city') !== null){
    let city = localStorage.getItem('city');

    updateCity(city)
        .then((data) => updateUI(data))
        .catch((err) => console.log(err))
}
