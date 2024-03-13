// ArtworkListComponent.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtworkItemComponent from './ArtworkItemComponent';
import './App.css';


const ArtworkListComponent: React.FC = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, categoryFilter]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=10&fields=id,title,artist_display,date_display,main_reference_number,thumbnail,dimensions`
      );
      const result = await response.json();
      setArtworks(result.data);
      setTotalPages(result.pagination.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className='home'>
      <div>
        {artworks.map((artwork: any) => (
          <Link key={artwork.id} to={`/artwork/${artwork.id}`}>
            <ArtworkItemComponent artwork={artwork} />
          </Link>
        ))}
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ArtworkListComponent;
