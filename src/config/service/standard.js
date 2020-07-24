import axios from 'axios';

const standard = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 100000,
  transformResponse: [
    function (data) {
      return data;
    },
  ],
});

standard.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default standard;
