// ArtworkDetailsPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
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

const ArtworkDetailsPage: React.FC<{ artworks: Artwork[] }> = ({ artworks }) => {
  const { id } = useParams<{ id?: string }>();
  const artwork = artworks.find((artwork) => artwork.id === parseInt(id || '', 10));

  const goBack = () => {
    window.history.back(); // Go back to the previous page
  };

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="artwork-details">
      
      <h2>{artwork.title}</h2>
      <p>Artist: {artwork.artist_display}</p>
      <p>Date: {artwork.date_display}</p>
      <p>Main Reference Number: {artwork.main_reference_number}</p>
      <img src={artwork.thumbnail} alt={artwork.title} />
      <p>Dimensions: {artwork.dimensions}</p>
      {/* Additional artwork details can be displayed here */}
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default ArtworkDetailsPage;
