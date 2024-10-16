import {Outlet, useParams} from "react-router-dom";
import {API} from "../api.ts";
import {useState, useEffect, useCallback} from "react";
import {Album as AlbumProps} from "../types/album";
import {Genre} from "../types/genre";
import {Artist} from "../types/artist";

function AlbumContent({album} : {album: AlbumProps}) {
  return (
    <main style={{textAlign: "initial"}}>
      <div>
        <strong>Title: </strong>{album.name}
      </div>
      <div>
        {album.artists.length ? (
          <>
            <strong>Artists: </strong>
            <ul>{album.artists.map((artist: Artist) =>
              (<li key={artist.id}>{artist.name}</li>))}
            </ul>
          </>
        ) : null }
      </div>
      <div>
        <strong>Album type: </strong>{album.album_type}
      </div>
      <div>
        <strong>Total tracks: </strong>{album.total_tracks}
      </div>
      <div>
        <strong>Release date: </strong>{album.release_date}
      </div>
      <div>
        <strong>Label: </strong>{album.label}
      </div>
      <div>
        {album.genres.length ? (
          <>
            <strong>Genres: </strong>
            <ul>{album.genres.map((genre: Genre) =>
              (<li key={genre.id}>{genre.name}</li>))}
            </ul>
          </>
        ) : null }
      </div>
      <div>
        <strong>Popularity: </strong>{album.popularity}
      </div>
      {album.spotify_id ? (
        <div>
          <p>Check it on <a href={`https://open.spotify.com/album/${album.spotify_id}`}>Spotify!</a></p>
        </div>
      ) : null}
    </main>
  );
}

function Album() {
  const {albumId} = useParams();

  const [album, setAlbum] = useState<AlbumProps>();

  const getAlbum = useCallback(async () => {
    if (!albumId) {
      return;
    }
    const response = await API.GetAlbum(albumId);
    if (response.success && response.result.data) {
      const albumData: AlbumProps = JSON.parse(response.result.data) as AlbumProps;
      setAlbum(albumData);
    } else {
      alert(response.result.errors)
    }
  }, [albumId])

  useEffect(() => {
    getAlbum()
      .catch((err: unknown) => {
        console.error(err);
      })
  }, [getAlbum])

  return (
    <>
      {album ? <AlbumContent album={album} /> : null }
      <Outlet />
    </>
  );
}

export default Album
