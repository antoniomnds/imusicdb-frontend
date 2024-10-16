import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Albums from "./routes/albums";
import Album from "./routes/album";
import NotFound from "./routes/notFound";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:albumId" element={<Album />} />
          <Route path="*" element={<NotFound />} /> {/* will match only when no other routes do */}
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
