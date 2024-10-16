import {apiCall, API_GET} from "./utils/APIUtils";

export const API = {
    GetUser: async () => apiCall({
        method: API_GET,
        endpoint: "users/me"
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GetSavedAlbums: async (queryParams: Record<string, any>) => apiCall({
        method: API_GET,
        endpoint: "albums/me",
        queryParams: queryParams
    }),
    GetAlbum: async (albumId: string) => apiCall({
        method: API_GET,
        endpoint: `albums/${albumId}`
    }),
}
