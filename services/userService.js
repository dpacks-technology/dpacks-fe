import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance
const userService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

export const getWebPages = async (count, page) => {
    try {
        const response = await userService.get(`/api/web/webpages/${count}/${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWebPagesCount = async () => {
    try {
        const response = await userService.get(`/api/web/webpages/count`);
        return response.data;
    } catch (error) {
        throw error;
    }
}