
import axios from "axios";
//import store from '../redux/store'
import {
    getItem,
    KEY_ACCESS_TOKEN,
    removeItem,
    setItem,
} from  './localStorageManager';



export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true,
});


axiosClient.interceptors.request.use((request) => {

    //console.log("request", request)
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
});

axiosClient.interceptors.response.use(async (respone) => {
    const data = respone.data;
    if (data.status === "OK") {
        //console.log("data",data);
        return data;
    }

    //console.log("respone" , respone);

    const originalRequest = respone.config;
    const statusCode = data.statusCode;
    const error = data.message;

    


    if(statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const response = await axios.create({
            withCredentials:true,
        }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)


        console.log("response from backend", response);
        if (response.data.status === "OK") {
            setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
            originalRequest.headers[ 
                "Authorization"
            ] = `Bearer ${response.data.result.accessToken}`;

            return axios(originalRequest);
        }else{
            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace("/login", "_self");
            return Promise.reject(error);
        }
        
    }
    // console.log("erroe axios ", error)
    return Promise.reject(error);
});