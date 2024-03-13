import React from 'react';
import './ArtworkItemComponent.css'; 

const ArtworkItemComponent: React.FC<{ artwork: any }> = ({ artwork }) => {
    const thumbnail = artwork.thumbnail;

    if (!thumbnail) {
  return (
    <div className="artwork-item">
      <img src={artwork.thumbnail} alt={artwork.title} />
      <div className="artwork-details">
        <h3>{artwork.title}</h3>
        <p>Artist: {artwork.artist_display}</p>
        <p>Date: {artwork.date_display}</p>
      </div>
    </div>
  );
  }

  return (
    <div className="artwork-item">
      <img src={thumbnail.lqip} alt={thumbnail.alt_text} width={thumbnail.width} height={thumbnail.height} />
      <div className="artwork-details">
        <h3>{artwork.title}</h3>
        <p>Artist: {artwork.artist_display}</p>
        <p>Date: {artwork.date_display}</p>
      </div>
    </div>
  );
};

export default ArtworkItemComponent;
