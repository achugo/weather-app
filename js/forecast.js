
const key = API.key;
//http://dataservice.accuweather.com/currentconditions/v1/
const getWeather = async (id) => {

const baseurl = 'http://dataservice.accuweather.com/currentconditions/v1/';
const query = `${id}?apikey=${key}`;

const response = await fetch(baseurl + query)
const data = await response.json();
return data[0];

}
const getCity = async (city) => {
    const baseurl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&&q=${city}`;

    const response = await fetch(baseurl + query);
    const data = await response.json()
    return data[0];
}



// getCity('london')
//     .then(data => {
//         return getWeather(data.Key)
//     }).then((data) => {
//         console.log(data)})
//     .catch((err) => console.log(err))