import axios from 'axios';

const REACT_APP_DNS = "https://world.openfoodfacts.org/category/wines-from-portugal.json";

const getItems = (page: number) => {
    const url = REACT_APP_DNS + `?page=${page}&page_size=8`;
    return axios.get(url)
};


const requests = {
    getItems,
};

export default requests;

