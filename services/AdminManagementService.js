import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance
const adminUserService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all admins
export const getAdmins = async (count, page, key, val) => {
    try {
        const response = await adminUserService.get(`/api/admin_user/admins/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all admins count
export const getAdminsCount = async (key, val) => {
    try {
        const response = await adminUserService.get(`/api/admin_user/admins/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all admins by status
export const getAdminsByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await adminUserService.get(`/api/admin_user/admins/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all admins by status count
export const getAdminsByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await adminUserService.get(`/api/admin_user/admins/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all admins by datetime
export const getAdminsByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await adminUserService.get(`/api/admin_user/admins/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//get all admins by datetime count
export const getAdminsByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await adminUserService.get(`/api/admin_user/admins/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editAdmin = async (id, data) => {
    try {
        const response = await adminUserService.put(`/api/admin_user/admins/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAdminById = async (id) => {
    try {
        const response = await adminUserService.get(`/api/admin_user/admin/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAdmin = async (id) => {
    try {
        const response = await adminUserService.delete(`/api/admin_user/admins/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all admins by id and delete
export const deleteAdminsBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await adminUserService.delete(`/api/admin_user/admins/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateAdminStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await adminUserService.put(`/api/admin_user/admins/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateAdminStatus = async (id, status) => {
    try {
        const response = await adminUserService.put(`/api/admin_user/admins/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const AddAdminUser = async (data) => {
    try {
        const response = await adminUserService.post(`/api/admin_user/addAdmin`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}