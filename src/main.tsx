import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AlbumsPage from "./routes/albumsPage.tsx";
import AlbumPage from "./routes/albumPage.tsx";
import NotFoundPage from "./routes/notFoundPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* will match only when no other routes do */}
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
