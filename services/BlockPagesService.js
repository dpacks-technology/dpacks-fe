import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const BloackPageService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});


// get all webpages by status and datetime count // TODO: Change this function accordingly
export const AddToBlocklist = async (data) => {
    try {
        //print to console data
        console.log(data);
        const response = await BloackPageService.post(`http://localhost:4000/api/pros/Access/BlockList`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages // TODO: Change this function accordingly
export const getWebPages = async (count, page, key, val,userId) => {
    try {
        const response = await BloackPageService.get(`http://localhost:4000/api/pros/Access/BlockLists/${userId}/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const getWebPagesCount = async (key, val,userId) => {
    try {
        const response = await BloackPageService.get(`http://localhost:4000/api/pros/Access/BlockList/count/${userId}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const getPagesByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await BloackPageService.get(`http://localhost:4000/api/pros/Access/BlockList/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const getPagesByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await BloackPageService.get(`http://localhost:4000/api/pros/Access/BlockList/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateWebpagesStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await BloackPageService.put(`http://localhost:4000/api/pros/Access/BlockList/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateWebpagesStatus = async (id, status) => {
    try {
        const response = await BloackPageService.put(`http://localhost:4000/api/pros/Access/BlockList/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}



