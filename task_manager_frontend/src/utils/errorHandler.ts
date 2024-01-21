import {  AxiosError } from "axios";
import {  newsession } from "./session";


export const errorHandler = (e:AxiosError) =>{
    if (e.response?.status===403){
    
        newsession.logout();
        window.location.href = "/";
    }
}