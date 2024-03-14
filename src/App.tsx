import { BrowserRouter, Routes, Route } from "react-router-dom";
import Artworks from "./pages/artworks";
import NotFoundPage from "./pages/NotFound";
import ArtworkDetail from "./pages/artworks/ArtworkDetail";
import './app.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Artworks />} />
            <Route path="/book/:id" element={<ArtworkDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
