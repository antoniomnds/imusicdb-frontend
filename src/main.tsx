import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SavedAlbums from "./routes/savedAlbums.tsx";
import SimilarArtists from "./routes/similarArtists.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/albums/saved" element={<SavedAlbums />} />
          <Route path="/albums/saved/similar-artists" element={<SimilarArtists />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
