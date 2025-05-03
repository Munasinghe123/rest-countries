import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = () => axios.get(`${BASE_URL}/all`);

export const fetchCountryByName = (name) =>
    axios.get(`${BASE_URL}/name/${name}`);


export const fetchByRegion = (region) =>
    axios.get(`${BASE_URL}/region/${region}?fields=name,flags,region,capital,population,languages,cca3`);

export const fetchCountryByCode = (code) =>
    axios.get(`${BASE_URL}/alpha/${code}`);
  
  