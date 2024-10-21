import {useCallback, useEffect, useState} from "react";
import {API} from "../api";
import {Outlet} from "react-router-dom";
import {Album} from "../types/album";
import {Albums} from "../features/albums/albums.tsx";

function NoAlbums() {
  return (
    <p>No album data available. Please click on &#39;Refresh&#39;!</p>
  );
}

function AlbumsPage() {
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
        {albums?.length ? <Albums albums={albums}/> : <NoAlbums />}
        <br />
        <button type="button" onClick={refreshSavedAlbums}>Refresh</button>
      </main>
      <Outlet />
    </>
  );
}

export default AlbumsPage
