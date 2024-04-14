import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const billingService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all biliing profiles // TODO: Change this function accordingly
export const GetBillingProfiles = async (count, page, key, val) => {
    try {
        const response = await billingService.get(`/api/billing/profiles/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all biliing profiles count // TODO: Change this function accordingly
export const GetBillingProfileCount = async (key, val) => {
    try {
        const response = await billingService.get(`/api/billing/profiles/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all billing profile by status // TODO: Change this function accordingly
export const GetBillingProfileByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await billingService.get(`/api/billing/profiles/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const GetBillingProfileByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await billingService.get(`/api/billing/profiles/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const GetBillingProfileDateTime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await billingService.get(`/api/billing/profiles/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const GetBillingProfileByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await billingService.get(`/api/billing/profiles/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime // TODO: Change this function accordingly
export const EditBillingProfile = async (id, data) => {
    try {
        const response = await billingService.put(`/api/billing/profiles/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const GetBillingProfileById = async (id) => {
    try {
        const response = await billingService.get(`/api/billing/profile/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const DeleteBillingProfileByID = async (id) => {
    try {
        const response = await billingService.delete(`/api/billing/profiles/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const DeleteBillingProfileByIDBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await billingService.delete(`/api/billing/profiles/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const UpdateBillingProfileStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await billingService.put(`/api/billing/profiles/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const UpdateBillingProfileStatus = async (id, status) => {
    try {
        const response = await billingService.put(`/api/billing/profiles/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const AddBillingProfile = async (data) => {
    try {
        const response = await billingService.post(`/api/billing/profiles`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}