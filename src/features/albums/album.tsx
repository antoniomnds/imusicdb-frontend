import {Album as AlbumProps} from "../../types/album.ts";
import {Artist} from "../../types/artist.ts";
import {Genre} from "../../types/genre.ts";

export function Album({album} : {album: AlbumProps}) {
  return (
    <main style={{textAlign: "initial"}}>
      <h2>Album</h2>
      <section>
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
          ) : null}
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
          ) : null}
        </div>
        <div>
          <strong>Popularity: </strong>{album.popularity}
        </div>
        {album.spotify_id ? (
          <div>
            <p>Check it on <a href={`https://open.spotify.com/album/${album.spotify_id}`}>Spotify!</a></p>
          </div>
        ) : null}
      </section>
      <section>

      </section>
    </main>
  );
}
