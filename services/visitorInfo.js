import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const   visitorinfoServices = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all webpages // TODO: Change this function accordingly
export const getWebPages = async (count, page, key, val) => {
    try {
        const response = await  visitorinfoServices.get(`/api/analytics/visitorInfo/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const getWebPagesCount = async (key, val) => {
    try {
        const response = await  visitorinfoServices.get(`/api/analytics/visitorInfo/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}




// get all webpages by datetime // TODO: Change this function accordingly
export const getPagesByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await  visitorinfoServices.get(`/api/web/webpages/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const getPagesByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await  visitorinfoServices.get(`/api/web/webpages/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



// get all webpages by status and datetime count // TODO: Change this function accordingly
export const getPageById = async (id) => {
    try {
        const response = await  visitorinfoServices.get(`/api/web/webpage/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

