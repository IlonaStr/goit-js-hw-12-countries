export default function fetchCounties(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
        return response.json()
    }).catch (error => console.log(error))
}