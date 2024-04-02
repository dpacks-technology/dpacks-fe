import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const endpointService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all webpages // TODO: Change this function accordingly
export const getRatelimits = async (count, page, key, val) => {
    try {
        const response = await endpointService.get(`/api/ratelimit/ratelimits/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const getRatelimitCount = async (key, val) => {
    try {
        const response = await endpointService.get(`/api/ratelimit/ratelimits/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const getRatelimitsByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await endpointService.get(`/api/ratelimit/ratelimits/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const getRatelimitsByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await endpointService.get(`/api/ratelimit/ratelimits/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const getRatelimitsByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await endpointService.get(`/api/ratelimit/ratelimits/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const getRatelimitsByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await endpointService.get(`/api/ratelimit/ratelimits/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime // TODO: Change this function accordingly
export const editPages = async (id, data) => {
    try {
        const response = await endpointService.put(`/api/web/webpages/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const getPageById = async (id) => {
    try {
        const response = await endpointService.get(`/api/web/webpage/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deletePage = async (id) => {
    try {
        const response = await endpointService.delete(`/api/web/webpages/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteWebpagesBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await endpointService.delete(`/api/web/webpages/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateRatelimitsStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await endpointService.put(`/api/ratelimit/ratelimits/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateRatelimitStatus = async (id, status) => {
    try {
        const response = await endpointService.put(`/api/ratelimit/ratelimits/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const AddWebpage = async (data) => {
    try {
        const response = await endpointService.post(`/api/web/webpage`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}