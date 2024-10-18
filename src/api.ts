import {apiCall, API_GET, API_POST} from "./utils/APIUtils";
import {Album} from "./types/album.ts";

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
    GetSimilarAlbums: async (albumId: string) => apiCall({
        method: API_GET,
        endpoint: `albums/${albumId}/similar`
    }),
    CreateAlbum: async (album: Album) => apiCall({
        method: API_POST,
        endpoint: "albums",
        body: { album: album }
    })
}
