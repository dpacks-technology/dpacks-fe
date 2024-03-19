import axios from 'axios';
import Keys from "@/Keys";

// Create an axios instance
const adminService = axios.create({
    baseURL: Keys.ADMIN_SERVICE_API_URL
});

export const getAdmins = async () => {
    try {
        const response = await adminService.get(`/api/admin_users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};