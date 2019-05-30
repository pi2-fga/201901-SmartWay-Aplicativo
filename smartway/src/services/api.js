import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.sistemas.dftrans.df.gov.br/linha/parada/codigo'
});

export default api;