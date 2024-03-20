import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance
const userService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

export const getWebPages = async (count, page, key, val) => {
    try {
        const response = await userService.get(`/api/web/webpages/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWebPagesCount = async (key, val) => {
    try {
        const response = await userService.get(`/api/web/webpages/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPagesByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await userService.get(`/api/web/webpages/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPagesByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await userService.get(`/api/web/webpages/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPagesByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await userService.get(`/api/web/webpages/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPagesByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await userService.get(`/api/web/webpages/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}