import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const AlertService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all webpages // TODO: Change this function accordingly
export const GetAllAlert = async (count, page, key, val, id) => {
    try {
        const response = await AlertService.get(`/api/web/webpages/${count}/${page}/${id}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const GetAlertCount = async (key, val,id) => {
    try {
        const response = await AlertService.get(`/api/web/webpages/count/${id}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const GetAlertByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await AlertService.get(`/api/web/webpages/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const GetAlertByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await AlertService.get(`/api/web/webpages/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



// get all webpages by status and datetime // TODO: Change this function accordingly
export const EditAlertPage = async (id, data) => {
    try {
        const response = await AlertService.put(`/api/web/webpages/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const GetAlertbyId = async (id) => {
    try {
        const response = await AlertService.get(`/api/web/webpage/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const DeleteAlertByID = async (id) => {
    try {
        const response = await AlertService.delete(`/api/web/webpages/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const DeleteAlertByIDBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await AlertService.delete(`/api/web/webpages/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const UpdateAlerttatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await AlertService.put(`/api/web/webpages/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const UpdateAlerttatus = async (id, status) => {
    try {
        const response = await AlertService.put(`/api/web/webpages/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const CreateNewAlert = async (data) => {
    try {
        const response = await AlertService.post(`/api/web/webpage`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}