
import axios from "axios";
import Keys from "@/Keys";

const messageService = axios.create({
    baseURL: Keys.MESSAGE_SERVICE_API_URL,
});

export const GetMessagesByWebId = async (webId) => {
    try {
        const response = await messageService.get(`/getMessagesByWebId?webId=${webId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetMessagesByVisitorId = async ({ webId, visitorId }) => {
    try {
        const response = await messageService.get(`/getMessagesByVisitorId?webId=${webId}&visitorId=${visitorId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const AddMessage = async ({webId},data) => {
    try {
        const response = await messageService.post('/insertData?webId=${webId}', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const GetLastMessage = async (webId, visitorId) => {
    try {
        const response = await messageService.get(`/getLastMessage?webId=${webId}&visitorId=${visitorId}`);
        return response.data;

    } catch (error) {
        throw error;
    }
};