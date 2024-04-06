import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const webpagesService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all webpages // TODO: Change this function accordingly
export const GetAutoResponds = async (count, page, key, val) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// get all webpages count // TODO: Change this function accordingly
export const getAutoRespondsCount = async (key, val) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const getAutoRespondsByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const getAutoRespondsByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const getAutoRespondsByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const getAutoRespondsByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime // TODO: Change this function accordingly
export const editAutoResponds = async (id, data) => {
    try {
        const response = await webpagesService.put(`/api/chat/auto_respond/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const getAutoRespondsById = async (id) => {
    try {
        const response = await webpagesService.get(`/api/chat/auto_respond/id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteAutoResponds = async (id) => {
    try {
        const response = await webpagesService.delete(`/api/chat/auto_respond/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteAutoRespondsBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await webpagesService.delete(`/api/chat/auto_respond/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateAutoRespondsStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await webpagesService.put(`/api/chat/auto_respond/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateAutoRespondsStatus = async (id, status) => {
    try {
        const response = await webpagesService.put(`/api/chat/auto_respond/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const addAutoRespond = async (data) => {
    try {
        const response = await webpagesService.post(`/api/chat/auto_respond`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
