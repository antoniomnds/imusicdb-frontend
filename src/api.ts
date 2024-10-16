import {apiCall, API_GET} from "./utils/APIUtils";

export const API = {
    GetUser: async () => apiCall({
        method: API_GET,
        endpoint: "users/me"
    }),
    GetSavedAlbums: async (queryParams) => apiCall({
        method: API_GET,
        endpoint: "albums/me",
        queryParams: queryParams
    })
}
