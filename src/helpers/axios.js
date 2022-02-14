//i am using axios file bec i want to create a centralized api

import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';

const token=window.localStorage.getItem('token');

const axiosInstace=axios.create({
    baseURL: api,
    headers: {
        'authorization': token ? `Bearer ${token}` : ''
    }
});

axiosInstace.interceptors.request.use((req)=>{
    const { auth } =store.getState();
    if(auth.token){
        req.headers.authorization = `Bearer ${auth.token}`;
    }
   return req
})

export default axiosInstace;