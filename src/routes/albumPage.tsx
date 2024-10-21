import {Outlet, useParams} from "react-router-dom";
import {API} from "../api.ts";
import {useState, useEffect, useCallback} from "react";
import {Album as AlbumProps} from "../types/album";
import {Album} from "../features/albums/album.tsx";

function AlbumPage() {
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
      {album ? <Album album={album} /> : null }
      <Outlet />
    </>
  );
}

export default AlbumPage
