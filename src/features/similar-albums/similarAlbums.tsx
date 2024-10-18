import {Album} from "../../types/album.ts";
import {API} from "../../api.ts";
import {SimilarAlbum} from "./similarAlbum.tsx"
import {SyntheticEvent, useCallback, useEffect, useState} from "react";
import React from "react";
import {SnackbarCloseReason} from "@mui/material/Snackbar/useSnackbar.types";
import {IconButton, Skeleton, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function SuccessSnackbar({open, setOpen}: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const handleClose = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      anchorOrigin={{vertical: "top", horizontal: "center"}}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Album added to favourites!"
      action={action}
    />
  );
}
export function SimilarAlbums({album} : {album: Album}) {
  const [similarAlbums, setSimilarAlbums] = useState<Album[]>([]);
  const [open, setOpen] = useState(false);

  const getSimilarAlbums = useCallback(async () => {
    const response = await API.GetSimilarAlbums(String(album.id));
    if (response.success && response.result.data) {
      const albumsData: Album[] = JSON.parse(response.result.data) as Album[];
      albumsData.forEach((albumsDatum, idx) => {
        albumsDatum.id = idx; // a virtual id to use as key in lists
      })
      setSimilarAlbums(albumsData);
    } else {
      alert(response.result.errors)
    }
  }, [album])

  useEffect(() => {
    if (!similarAlbums.length) {
      getSimilarAlbums()
        .catch((err: unknown) => {
          console.error(err);
        })
    }
  }, [getSimilarAlbums, similarAlbums])

  function removeAlbum(albumId: number) {
    setSimilarAlbums((prevAlbums: Album[]) =>
      prevAlbums.filter((prevAlbum: Album) => prevAlbum.id !== albumId));
    setOpen(true);
  }

  return (
    <>
      <SuccessSnackbar open={open} setOpen={setOpen} />
      {similarAlbums.length ? (
        <>
          <h2>Similar albums</h2>
          {similarAlbums.map((similarAlbum: Album) => (
            <React.Fragment key={similarAlbum.id}>
              <SimilarAlbum album={similarAlbum} id={similarAlbum.id} onRemove={removeAlbum} />
              <br />
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          <Skeleton variant="rectangular" width={345} height={50}/>
          <br />
          <Skeleton variant="rectangular" width={345} height={200}/>
        </>
      )}
    </>
  );
}
