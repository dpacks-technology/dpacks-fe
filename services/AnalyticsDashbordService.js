import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all webpages // TODO: Change this function accordingly
export const getTraffic = async (count, page, key, val) => {
    try {
        const response = await webpagesService.get(`/api/web/webpages/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const visitorSource = async (key, val) => {
    try {
        const response = await webpagesService.get(`/api/web/webpages/count?key`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const visitorCountry = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await webpagesService.get(`/api/web/webpages/status/`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const visitorDevice = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await webpagesService.get(`/api/web/webpages/status/count?status=`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
