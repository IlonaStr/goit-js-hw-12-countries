'use strict';

import PNotify from 'pnotify/dist/es/PNotify.js';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import countryListTemplate from './country-list.hbs';
import countryInfoTemplate from './country-info.hbs';
import './styles.css';

const searchQueryInput = document.querySelector('.js-search');
const  list = document.querySelector('.country-list');
const info = document.querySelector('.country-blocks');

searchQueryInput.addEventListener('input', debounce(inputCountrySearch, 500));

function inputCountrySearch(e) {
    const inputCountry = e.target.value;
    fetchCountry(inputCountry);
};

function renderCountriesList(items) {
    const markup = countryListTemplate(items);
    list.insertAdjacentHTML('beforeend', markup);
};
function renderCountryInfo(item) {
    const markup = countryInfoTemplate(item);
    info.insertAdjacentHTML('beforeend', markup);
};
function clearCountriesList() {
    list.innerHTML = '';
    info.innerHTML = '';
};

function renderCountry(country) {
    if(country.length >= 2 && country.length <= 10) {
        renderCountriesList(country);
    } else if (country.length === 1) {
        renderCountryInfo(country);
    } else if (country.length > 10) {
        PNotify.error({
            text: 'Too many matches found. Please enter a more specific query',
            delay: 3000,
        });
    } else {
        PNotify.error({
            text: "Something went wrong, please try again",
            delay: 3000,
        })
    }
}

function fetchCountry(country) {
    clearCountriesList();
    if (country === '') {
        return;
    }
    fetchCountries(country).then(countries => renderCountry(countries))
    .catch(error => console.log(error))
}