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
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
}