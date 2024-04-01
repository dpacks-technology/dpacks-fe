import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance -- NO NEED TO CHANGE THIS
const marketplaceService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});

// get all webpages // TODO: Change this function accordingly
export const getTemplates = async (count, page, key, val) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all webpages count // TODO: Change this function accordingly
export const getTemplatesCount = async (key, val) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status // TODO: Change this function accordingly
export const getTemplatesByStatus = async (count, page, status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/status/${count}/${page}?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status count // TODO: Change this function accordingly
export const getTemplatesByStatusCount = async (status, key, val) => {

    // convert status array to string with commas
    let statusString = status.join(',');

    console.log(statusString);

    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/status/count?status=${statusString}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime // TODO: Change this function accordingly
export const getTemplateByDatetime = async (count, page, start, end, key, val) => {

    console.log(start);

    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/datetime/${count}/${page}?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by datetime count // TODO: Change this function accordingly
export const getTemplatesByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime // TODO: Change this function accordingly
export const editTemplate = async (id, data) => {
    try {
        const response = await marketplaceService.put(`/api/marketplace/templates/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const getTemplateById = async (id) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/template/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteTemplate = async (id) => {
    try {
        const response = await marketplaceService.delete(`/api/marketplace/templates/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const deleteTemplateBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await marketplaceService.delete(`/api/marketplace/templates/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateTemplatesStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await marketplaceService.put(`/api/marketplace/templates/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const updateTemplatesStatus = async (id, status) => {
    try {
        const response = await marketplaceService.put(`/api/marketplace/templates/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all webpages by status and datetime count // TODO: Change this function accordingly
export const AddWebpage = async (data) => {
    try {
        const response = await marketplaceService.post(`/api/marketplace/templates`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getTemplatesByDid = async (count, page, key, val) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/template/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

