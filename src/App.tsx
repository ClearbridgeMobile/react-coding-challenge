// App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import ArtworkDetailsPage from './ArtworkDetailsPage';
import CommentsForm from './CommentsForm';
import './App.css';

interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  main_reference_number: string;
  thumbnail: string;
  dimensions: string;
}

const pageSize = 10;

const ArtworkList: React.FC<{ artworks: Artwork[] }> = ({ artworks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArtworks = artworks.filter(artwork => 
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (categoryFilter === '' || artwork.artist_display.toLowerCase().includes(categoryFilter.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredArtworks.length / pageSize);
  const paginatedArtworks = filteredArtworks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <article>
      <div className="search">
        <input type="text" placeholder="Search by title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <input type="text" placeholder="Filter by category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} />
      </div>
      <ul className="artwork-list">
        {paginatedArtworks.map((artwork) => (
          <li key={artwork.id} className="artwork">
            <Link to={`/artwork/${artwork.id}`}>
              <h3>{artwork.title}</h3>
              <img src={artwork.thumbnail} alt={artwork.title} />
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </article>
  );
};

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=1&limit=${pageSize}`);
      const data = await response.json();
      setArtworks(data.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Artwork List</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/comments">Comments Form</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ArtworkList artworks={artworks} />} />
            <Route path="/artwork/:id" element={<ArtworkDetailsPage artworks={artworks} />} />
            <Route path="/comments" element={<CommentsForm />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Artwork Book List</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
