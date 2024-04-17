import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const UserProfileService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all webpages // TODO: Change this function accordingly
export const GetUserData = async (UId) => {
    try {
        const response = await UserProfileService.get(`http://localhost:4000/api/pros/Users/GetData/${UId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const UpdateUser = async (UId,data) => {
    try {
        console.log(data);
        const response = await UserProfileService.put(`http://localhost:4000/api/pros/Users/Update/${UId}`,data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteWebpagesBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await UserProfileService.delete(`/api/web/webpages/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateWebpagesStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await UserProfileService.put(`/api/web/webpages/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateWebpagesStatus = async (id, status) => {
    try {
        const response = await UserProfileService.put(`/api/web/webpages/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const AddWebpage = async (data) => {
    try {
        const response = await UserProfileService.post(`/api/web/webpage`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}