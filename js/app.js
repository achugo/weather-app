const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details')

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
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
})