import {useCallback, useEffect, useState} from "react";
import {API} from "../api";

interface Album {
  name: string,
  album_type?: string,
  total_tracks: number,
  spotify_id?: string,
  release_date: string,
  label: string,
  popularity?: number,
}

function AlbumListing({ albums }: { albums: Album[]}) {
  return (
    <section>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Album Type</th>
          <th>Total Tracks</th>
          <th>Spotify ID</th>
          <th>Release Date</th>
          <th>Label</th>
          <th>Popularity</th>
        </tr>
        </thead>
        <tbody>
        {albums.map((album) => (
          <tr key={album.spotify_id}>
            <td>{album.name}</td>
            <td>{album.album_type}</td>
            <td>{album.total_tracks}</td>
            <td>{album.spotify_id}</td>
            <td>{album.release_date}</td>
            <td>{album.label}</td>
            <td>{album.popularity}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </section>
  );
}

function SavedAlbums() {
  const [albums, setAlbums] = useState<Album[]>();

  const getSavedAlbums = useCallback(async (queryParams = {}) => {
    const response = await API.GetSavedAlbums(queryParams);
    if (response.success) {
      const albumData: Album = JSON.parse(response.result.data);
      setAlbums(albumData);
    }
  }, [])

  useEffect(() => {
    getSavedAlbums()
      .catch((err: unknown) => {
        console.error(err);
      })
  }, [getSavedAlbums])

  function refreshSavedAlbums() {
    getSavedAlbums({refresh: true})
      .catch((err: unknown) => {
        console.error(err);
      });
  }

  return (
    <>
      <h2>Saved Albums</h2>
      {albums ? <AlbumListing albums={albums}/> : null}
      <hr />
      <button type="button" onClick={refreshSavedAlbums}>Refresh</button>
    </>
  );
}

export default SavedAlbums
