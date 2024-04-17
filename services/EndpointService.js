import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const endpointService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
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
export const EditRatelimit = async (id, data) => {
    try {
        const response = await endpointService.put(`/api/ratelimit/ratelimits/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const getRatelimitById = async (id) => {
    try {
        const response = await endpointService.get(`/api/ratelimit/ratelimit/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteRatelimit = async (id) => {
    try {
        const response = await endpointService.delete(`/api/ratelimit/ratelimits/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteRatelimitsBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await endpointService.delete(`/api/ratelimit/ratelimits/bulk/${idsString}`);
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
export const AddRatelimit = async (data) => {
    try {
        const response = await endpointService.post(`/api/ratelimit/addratelimit`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}