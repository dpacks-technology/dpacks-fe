import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const DashboardService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all webpages // TODO: Change this function accordingly
export const getWebPages = async (count, page, key, val) => {
    try {
        const response = await DashboardService.get(`http://localhost:4000/api/pros/Access/AccessLists/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const getWebPagesCount = async (key, val) => {
    try {
        const response = await DashboardService.get(`http://localhost:4000/api/pros/Access/AccessList/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const getPagesByDatetime = async (count, page, start, end, key, val) => {

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
export const getPagesByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await DashboardService.get(`http://localhost:4000/api/pros/Access/AccessList/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}


