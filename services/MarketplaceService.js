import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const marketplaceService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all templates // TODO: Change this function accordingly
export const getTemplates = async (count, page, key, val) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get all templates count // TODO: Change this function accordingly
export const getTemplatesCount = async (key, val) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/count?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all templates by status // TODO: Change this function accordingly
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

// get all templates by status count // TODO: Change this function accordingly
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

// get all templates by datetime // TODO: Change this function accordingly
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

// get all templates by datetime count // TODO: Change this function accordingly
export const getTemplatesByDatetimeCount = async (start, end, key, val) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/datetime/count?start=${start}&end=${end}&key=${key}&val=${val}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// edit template details  // TODO: Change this function accordingly
export const editTemplate = async (id, data) => {
    try {
        const response = await marketplaceService.put(`/api/marketplace/templates/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get all templates by id // TODO: Change this function accordingly
export const getTemplateById = async (id) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/template/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// delete template by id // TODO: Change this function accordingly
export const deleteTemplate = async (id) => {
    try {
        const response = await marketplaceService.delete(`/api/marketplace/templates/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// delete templates bulk // TODO: Change this function accordingly
export const deleteTemplateBulk = async (ids) => {
    let idsString = ids.join(',');

    try {
        const response = await marketplaceService.delete(`/api/marketplace/templates/bulk/${idsString}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// update template status bulk // TODO: Change this function accordingly
export const updateTemplatesStatusBulk = async (ids, status) => {
    let idsString = ids.join(',');

    try {
        const response = await marketplaceService.put(`/api/marketplace/templates/status/bulk/${idsString}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// update template status // TODO: Change this function accordingly
export const updateTemplatesStatus = async (id, status) => {
    try {
        const response = await marketplaceService.put(`/api/marketplace/templates/status/${id}`, {status: status});
        return response.data;
    } catch (error) {
        throw error;
    }
}

// add new template
export const AddTemplate = async (data) => {
    try {
        const response = await marketplaceService.post(`/api/marketplace/template`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// download template
export const downloadById = async (id) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templat/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
1

// get all templates by user id
export const getTemplatesByDid = async (count, page, key, val) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/user/${count}/${page}?key=${key}&val=${val}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// get active templates
export const getActiveTemplates = async (count, page) => {
    try {
        const response = await marketplaceService.get(`/api/marketplace/templates/acceptstatus/${count}/${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// add rating to template
export const AddRating = async (data) => {
    try {
        const response = await marketplaceService.post(`/api/marketplace/template/rating`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// upload new template
export const UploadTemplate = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await marketplaceService.post(`/api/marketplace/template/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

// upload new template thumbnail image
export const UploadTemplateImg = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await marketplaceService.post(`/api/marketplace/template/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

// search templates
export const getBySearchListingPage = (page, count) => {
    return axios.get(`/api/marketplace/templates/search/${count}/${page}`)
        .then(response => response.data)
        .catch(error => { throw error; });
}

// get templates by category
export const getByCategory = async (page, count, data) => {
    try {
        // Convert the selected categories array to a comma-separated string
        const categoriesString = data;

        // Include the selected categories in the API request
        const response = await marketplaceService.get(`/api/marketplace/templates/filter/${count}/${page}/${categoriesString}`);

        return response.data;
    } catch (error) {
        throw error;
    }
}


