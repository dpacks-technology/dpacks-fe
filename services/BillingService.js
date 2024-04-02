import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const billingService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all transactions // TODO: Change this function accordingly
export const GetTransactions = async (count, page, key, val) => {
    try {
        const response = await billingService.get(`/api/billing/transactions/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const GetTransactionCount = async (key, val) => {
    try {
        const response = await billingService.get(`/api/billing/transactions/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const GetTransactionByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await billingService.get(`/api/billing/transactions/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const GetTransactionByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await billingService.get(`/api/billing/transactions/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const GetTransactionDateTime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await billingService.get(`/api/billing/transactions/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const GetTransactionByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await billingService.get(`/api/billing/transactions/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime // TODO: Change this function accordingly
export const editPages = async (id, data) => {
    try {
        const response = await billingService.put(`/api/billing/transactions/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const getPageById = async (id) => {
    try {
        const response = await billingService.get(`/api/billing/transaction/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const DeleteTransactionByID = async (id) => {
    try {
        const response = await billingService.delete(`/api/billing/transactions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const DeleteTransactionByIDBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await billingService.delete(`/api/billing/transactions/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const UpdateTransactionStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await billingService.put(`/api/billing/transactions/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const UpdateTransactionStatus = async (id, status) => {
    try {
        const response = await billingService.put(`/api/billing/transactions/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const AddWebpage = async (data) => {
    try {
        const response = await billingService.post(`/api/billing/transactions`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}