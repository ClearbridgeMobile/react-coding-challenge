import { ImageData } from "../../pages/Details/Details";

const DisplayDetails: React.FC<ImageData> = ({
  image_id,
  title,
  artist_display,
  date_display,
  main_reference_number,
  dimensions,
}) => {
  return (
    <>
      <img
        src={`https://www.artic.edu/iiif/2/${image_id}/full/150,/0/default.jpg`}
      />
      <p>Title: {title}</p>
      <p>Artist Display: {artist_display}</p>
      <p>Date Display: {date_display}</p>
      <p>Main Reference Number: {main_reference_number}</p>
      <p>Dimensions: {dimensions}</p>
    </>
  );
};
export default DisplayDetails;
