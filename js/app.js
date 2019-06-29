const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

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

    updateCity(city)
        .then((data) => updateUI(data))
        .catch((err) => console.log(err))
})