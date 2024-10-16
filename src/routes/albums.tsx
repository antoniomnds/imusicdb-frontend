import {useCallback, useEffect, useState} from "react";
import {API} from "../api";
import {Link, Outlet} from "react-router-dom";
import {Album} from "../types/album";

function AlbumListing({ albums }: { albums: Album[]}) {
  return (
    <section>
      <table style={{ borderCollapse: "collapse"}}>
        <thead>
        <tr style={{ borderBottom: "1px solid" }}>
          <th>Name</th>
          <th>Artists</th>
          <th>Album Type</th>
          <th>Total Tracks</th>
          <th>Spotify ID</th>
          <th>Release Date</th>
          <th>Label</th>
          <th>Genres</th>
          <th>Popularity</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {albums.map((album: Album) => (
          <tr key={album.id} style={{ borderBottom: "1px solid black" }}>
            <td>{album.name}</td>
            <td>
              {album.artists.map((artist) => (
                <div key={artist.id}>{artist.name}</div>
              ))}
            </td>
            <td>{album.album_type}</td>
            <td>{album.total_tracks}</td>
            <td>{album.spotify_id}</td>
            <td>{album.release_date}</td>
            <td>{album.label}</td>
            <td>
              {album.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </td>
            <td>{album.popularity}</td>
            <td><Link to={`/albums/${String(album.id)}`}>View</Link></td>
          </tr>
        ))}
        </tbody>
      </table>
    </section>
  );
}

function Albums() {
  const [albums, setAlbums] = useState<Album[]>();

  const getSavedAlbums = useCallback(async (queryParams = {}) => {
    const response = await API.GetSavedAlbums(queryParams);
    if (response.success && response.result.data) {
      const albumsData: Album[] = JSON.parse(response.result.data) as Album[];
      setAlbums(albumsData);
    } else {
      alert(response.result.errors);
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
      <main>
        <h2>Saved Albums</h2>
        {albums ? <AlbumListing albums={albums}/> : null}
        <br />
        <button type="button" onClick={refreshSavedAlbums}>Refresh</button>
      </main>
      <Outlet />
    </>
  );
}

export default Albums
