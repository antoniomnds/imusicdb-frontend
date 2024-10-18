import {Album as AlbumProps} from "../../types/album.ts";
import {Artist} from "../../types/artist.ts";
import {Genre} from "../../types/genre.ts";
import {SimilarAlbums} from "../similar-albums/similarAlbums.tsx";
import Card from "@mui/material/Card";
import {Button, CardActions, CardHeader, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";

export function Album({album} : {album: AlbumProps}) {
  return (
    <main style={{textAlign: "initial", marginTop: "2rem"}}>
      <section>
        <Card sx={{maxWidth: 345}}>
          <CardHeader
            title={album.name}
            subheader={album.artists.map((artist: Artist) => artist.name).join(", ")}
          />
          <CardContent>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              Release date: {album.release_date}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {album.genres.length ? (
                <>
                  Genres: {album.genres.map((genre: Genre) => genre.name).join(", ")}
                </>
              ) : null}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              Label: {album.label}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              Tracks: {album.total_tracks}
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              Popularity: {album.popularity}
            </Typography>
          </CardContent>
          {album.spotify_id ? (
            <CardActions disableSpacing>
              <Button
                href={`https://open.spotify.com/album/${album.spotify_id}`}
                target="_blank"
                size="small"
              >
                Learn More
              </Button>
            </CardActions>
          ) : null}
        </Card>
      </section>
      <section style={{marginTop: "4rem"}}>
        <SimilarAlbums album={album}/>
      </section>
    </main>
  );
}
