import axios from "axios";
import Keys from "@/Keys";

// Create an axios instance
const adminDashboardService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL
});
export const getTotalUserCount = async () => {
    try {
        // Make an HTTP GET request to the backend endpoint
        const response = await adminDashboardService.get('/api/admin_dashboard/usersTotalCount');
        // Return the data from the response
        return response.data;
    } catch (error) {
        // If an error occurs, throw it so the caller can handle it
        throw error;
    }
};

export const getTotalWebsitesCount = async () => {
    try {
        // Make an HTTP GET request to the backend endpoint
        const response = await adminDashboardService.get('/api/admin_dashboard/websitesTotalCount');
        // Return the data from the response
        return response.data;
    } catch (error) {
        // If an error occurs, throw it so the caller can handle it
        throw error;
    }
};

export const getTotalApiSubscribersCount = async () => {
    try {
        // Make an HTTP GET request to the backend endpoint
        const response = await adminDashboardService.get('/api/admin_dashboard/apiSubscribersTotalCount');
        // Return the data from the response
        return response.data;
    } catch (error) {
        // If an error occurs, throw it so the caller can handle it
        throw error;
    }
};

export const getTotalMarketPlaceUsersCount = async () => {
    try {
        // Make an HTTP GET request to the backend endpoint
        const response = await adminDashboardService.get('/api/admin_dashboard/marketplaceUsersTotalCount');
        // Return the data from the response
        return response.data;
    } catch (error) {
        // If an error occurs, throw it so the caller can handle it
        throw error;
    }
};

export const UsedStorage = async () => {
    try {
        const response = await adminDashboardService.get('/api/admin_dashboard/sites/totalStorage');
        console.log((response.data))
        return response.data;
    } catch (error) {
        throw error;
    }

}

//site spcific storage
export const siteSpecificStorage = async () => {
    try {
        const response = await adminDashboardService.get('/api/admin_dashboard/sites/storage');
        console.log((response.data))
        return response.data;
    } catch (error) {
        throw error;
    }

}