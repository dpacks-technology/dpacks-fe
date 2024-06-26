import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const apiManagement = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all webpages // TODO: Change this function accordingly
export const getSubscribers = async (count, page, key, val) => {
    try {
        const response = await apiManagement.get(`/api/api_subscribers/subscribers/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getApiSubscribersCount = async (key, val) => {
    try {
        const response = await apiManagement.get(`/api/api_subscribers/subscribers/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}



export const getApiSubscribersByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await apiManagement.get(`/api/api_subscribers/subscribers/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



export const getApiSubscribersByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await apiManagement.get(`/api/api_subscribers/subscribers/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



export const getApiSubscriberById = async (id) => {
    try {
        const response = await apiManagement.get(`/api/api_subscribers/subscriber/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const deleteApiSubscriber = async (id) => {
    try {
        const response = await apiManagement.delete(`/api/api_subscribers/subscriber/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const deleteApiSubscribersBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await apiManagement.delete(`/api/api_subscribers/subscriber/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const regenerateApiKey = async (id) => {
    try {
        const response = await apiManagement.put(`/api/api_subscribers/subscriber/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const regenerateApiKeyBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await apiManagement.put(`/api/api_subscribers/subscribers/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


//api subscribing page services
export const AddApiSubscriber = async (data) => {
    try {
        const response = await apiManagement.post(`/api/api_subscribers/subscriber`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getApiKey = async (data) => {
    //http://localhost:4001/api/keypairs/${data} if you are running the api locally
    try {
        const response = await apiManagement.get(`/api/keypairs/${data}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const subscribeApiKey = async (data) => {
    try {
        const response = await apiManagement.post(`/api/keypairs/${data}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateApiKey = async (data) => {
    try {
        const response = await apiManagement.put(`/api/keypairs/${data}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteApiKey = async (data) => {
    try {
        const response = await apiManagement.delete(`/api/keypairs/${data}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}