import axios from 'axios';
import { history } from 'umi';

if (process.env.envType === 'dev') {
  axios.defaults.baseURL = '/service';
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:9876';
}

const instance = axios.create({
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  },
});


instance.interceptors.response.use((response) => {
  if (!response.data.success && response.data.code === 'FAILURE') {
    return Promise.reject(response);
  } else if (!response.data.success && response.data.code === 'UNAUTHORIZED') {
    history.replace('/401');
    return Promise.reject(response);
  }
  return response.data;
}, (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      history.replace('/401');
    } else if (error.response.status === 403) {
      history.replace('/403');
    } else {
      history.replace('/500');
    }
    return Promise.reject(error.response);
  }
  history.replace('/500');
  return Promise.reject(error);
});

export default instance;
