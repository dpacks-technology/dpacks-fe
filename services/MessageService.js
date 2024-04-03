// pages/api/MessageService.js
import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const messageService = axios.create({
    baseURL: Keys.MESSAGE_SERVICE_API_URL
});

export const AddMessage = async (data) => {
    try {
        const response = await messageService.post(`/insertData`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// read all messages
export const getMessages = async () => {
    try {
        const response = await messageService.get(`/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}