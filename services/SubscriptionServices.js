import axios from 'axios';
import Keys from "@/Keys";
import {AuthHeaders} from "@/util/AuthHeader";

const subscriptionService = axios.create({
    baseURL: Keys.USER_SERVICE_API_URL,
    headers: AuthHeaders
});

// get all subscription  // TODO: Change this function accordingly
export const GetSubscriptionByID = async (id) => {
    try {
        const response = await subscriptionService.get(`api/web/subscription/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//delete subscription

export const DeleteSubscriptionByID = async (id) => {
    try {
        const response = await subscriptionService.delete(`api/web/subscription/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}