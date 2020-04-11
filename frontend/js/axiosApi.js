import axios from 'axios'

//TODO cross origin errors?
export const axiosInstance = axios.create({
    // baseURL: ? TODO why don't we need it?
    timeout: 5000,
    headers: {
      'Authorization': "JWT " + localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && 
        error.response.statusText === "Unauthorized" &&
        !localStorage.hasOwnProperty('refresh_token')) {
      const refresh_token = localStorage.getItem('refresh_token');
      return axiosInstance
        .post('api/token/refresh/', {refresh: refresh_token})
        .then((response) => {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);

          axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
          originalRequest.headers['Authorization'] = "JWT " + response.data.access;

          return axiosInstance(originalRequest);
        }).catch(err => {
          console.log(err)
        });
    }
    Promise.reject(error);
  }
);
