import {Artist} from "./artist";
import {Genre} from "./genre";

export interface Album {
    id: number,
    name: string,
    artists: Artist[],
    album_type?: string,
    total_tracks: number,
    spotify_id?: string,
    release_date: string,
    label: string,
    genres: Genre[],
    popularity?: number,
}
