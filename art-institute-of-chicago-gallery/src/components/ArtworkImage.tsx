interface ArtWorkImagePropType {
    image_id: string;
    thumbnail: {
        alt_text: string;
        width: number;
        lqip: string;
        height: number;
    };
    className?: string;
}
  
function ArtworkImage({ thumbnail, image_id, className }: ArtWorkImagePropType) {
    return (<div
        style={{
            paddingTop: `${thumbnail?.height / thumbnail?.width * 100}%`,
            backgroundImage: `url(${thumbnail?.lqip})`,
        }}
        className={`relative bg-cover ${className}`}
    >
        <img src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`} alt={thumbnail?.alt_text} 
            width={thumbnail?.width}
            height={thumbnail?.height}
            className="absolute min-w-full min-h-full top-0 left-0 object-cover"
        />
    </div>);
}

export default ArtworkImage;
