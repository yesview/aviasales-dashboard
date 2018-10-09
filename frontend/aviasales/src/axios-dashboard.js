import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://yesview.ru/aviasales-dashboard/api/v1'
    // baseURL: 'http://127.0.0.1:3274/api/v1'
});

export default instance
