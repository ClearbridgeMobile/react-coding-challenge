import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

const ArtworkDetailComponent: React.FC = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
      const result = await response.json();
      setArtwork(result.data);
    } catch (error) {
      console.error('Error fetching artwork details:', error);
    }
  };


  return (
    <div className='home'>
      {artwork && (
        <div>
          <h2>{artwork.title}</h2>
          <p>Artist: {artwork.artist_display}</p>
          <p>Date: {artwork.date_display}</p>
          <p>Main Reference Number: {artwork.main_reference_number}</p>
          <p>Dimensions: {artwork.dimensions}</p>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetailComponent;
