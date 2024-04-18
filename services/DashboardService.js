import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const DashboardService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all webpages // TODO: Change this function accordingly
export const GetData = async (count, page, key, val,userId) => {
    try {
        
        const response = await DashboardService.get(`http://localhost:4000/api/pros/Access/AccessLists/${count}/${page}/${userId}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const GetDataCount = async (key, val,userId) => {
    try {
        const response = await DashboardService.get(`http://localhost:4000/api/pros/Access/AccessList/count/${userId}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const GetDataByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        
        const response = await DashboardService.get(`http://localhost:4000/api/pros/Access/AccessList/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const GetDataByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await DashboardService.get(`http://localhost:4000/api/pros/Access/AccessList/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

