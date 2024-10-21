import {Album} from "../../types/album.ts";
import {Link} from "react-router-dom";

export function Albums({ albums }: { albums: Album[]}) {
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
