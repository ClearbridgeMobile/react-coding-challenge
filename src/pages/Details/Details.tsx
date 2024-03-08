import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DisplayDetails from "../../components/DisplayDetails/DisplayDetails";

interface Props {
  curPg: number;
}

export interface ImageData {
  title?: string;
  artist_display?: string;
  date_display?: string;
  main_reference_number?: string;
  image_id?: string;
  dimensions?: string;
}

const Details: React.FC<Props> = ({ curPg }) => {
  const { id } = useParams();
  const [imgData, setImgData] = useState<ImageData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImageData = async () => {
      const imageData = await axios.get(
        `https://api.artic.edu/api/v1/artworks/${id}`
      );

      setImgData(imageData.data.data);
      setLoading(false);
    };

    fetchImageData();
  }, [id]);

  return (
    <div>
      <Link to={`/${curPg}`}>&#60;&#60;Back</Link>
      <div>
        {loading ? "Loading Details..." : <DisplayDetails {...imgData} />}
      </div>
    </div>
  );
};
export default Details;
