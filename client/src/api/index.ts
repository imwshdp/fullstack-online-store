import axios from "axios";

const $publicHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const $privateHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  config.headers['Content-Type'] = 'multipart/form-data';
  return config;
}

$privateHost.interceptors.request.use(authInterceptor);

export {
  $publicHost,
  $privateHost,
}