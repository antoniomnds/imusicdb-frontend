import {Artist} from "../../types/artist.ts";
import {Album} from "../../types/album.ts";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import {CardActions, CardHeader, IconButton, Tooltip, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Genre} from "../../types/genre.ts";
import {API} from "../../api.ts";


export function SimilarAlbum({album, id, onRemove}: {album: Album, id: number, onRemove: (albumId: number) => void }) {
  function handleFavorite() {
    API.CreateAlbum(album)
      .then((response) => {
        if (response.success) {
          onRemove(id);
        } else {
          alert(response.result.errors)
        }
      })
      .catch((err: unknown) => {
        console.error(err)
      });
  }

  return (
    <>
      <Card className="similar-album-card" sx={{maxWidth: 345}}>
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
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Save">
            <IconButton aria-label="add to favorites" onClick={handleFavorite}>
              <FavoriteIcon/>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </>
  );
}
