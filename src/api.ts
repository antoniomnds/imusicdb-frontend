import {apiCall, API_GET} from "./utils/APIUtils.ts";

export const API = {
    GetUser: async () => apiCall({
        method: API_GET,
        endpoint: "users/me"
    })
}
