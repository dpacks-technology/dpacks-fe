import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

// Create an axios instance -- NO NEED TO CHANGE THIS
const StorageService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

//get storage meter data

export const GetStorageByID = async (id) => {
    try {
        const response = await StorageService.get(`/api/storage/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}