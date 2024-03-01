import { useEffect, useState } from "react";

import ArtworkImage from "./ArtworkImage";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface ArtWorkDescriptionType {
  id: string;
  title: string;
  artist_display: string;
  date_display: string;
  main_reference_number: string;
  image_id: string;
  dimensions_detail: {
    clarification: number;
    depth: number;
    diameter: number;
    height: number;
    width: number;
  };
  thumbnail: {
    alt_text: string;
    width: number;
    lqip: string;
    height: number;
  };
}

function ArtworkDescription() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<ArtWorkDescriptionType>({
    id: "",
    title: "",
    artist_display: "",
    date_display: "",
    main_reference_number: "",
    image_id: "",
    dimensions_detail: {
      clarification: 0,
      depth: 0,
      diameter: 0,
      width: 0,
      height: 0,
    },
    thumbnail: {
      alt_text: "",
      width: 0,
      lqip: "",
      height: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.artic.edu/api/v1/artworks/${id}?fields=title,artist_display,date_display,main_reference_number,image_id,dimensions_detail,thumbnail`,
    )
      .then((data) => data.json())
      .then((data) => {
        setArtwork(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [id]);
  const {
    title,
    artist_display,
    date_display,
    main_reference_number,
    image_id,
    dimensions_detail,
    thumbnail,
  } = artwork;
  const { clarification, depth, diameter, height, width } = dimensions_detail;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="w-full bg-black py-2 text-xl text-white md:py-6 md:text-3xl"
      >
        Back
      </button>
      {error && <p>Something went wrong.</p>}
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <div className="flex w-full flex-col lg:flex-row">
            <ArtworkImage
              thumbnail={thumbnail}
              image_id={image_id}
              className="x-auto inline-block w-full min-w-0 lg:w-[70vw] h-fit"
            />
            <section className="flex flex-col lg:w-[30vw]">
              <div className="p-12">
                <h1 className="text-4xl">{title}</h1>
                <p className="p-2 font-sans text-2xl">Artist</p>
                <h2>{artist_display}</h2>
                <p className="p-2 font-sans text-2xl">Date</p>
                <h3>{date_display}</h3>
                <p className="p-2 font-sans text-2xl">Main Reference Number</p>
                <h3>{main_reference_number}</h3>
                <ul>
                  {clarification && (
                    <li>{`Clarification: ${clarification}`}</li>
                  )}
                  {depth && <li>{`Depth: ${depth}`}</li>}
                  {diameter && <li>{`Diameter: ${diameter}`}</li>}
                  {height && <li>{`Height: ${height}`}</li>}
                  {width && <li>{`Width: ${width}`}</li>}
                </ul>
              </div>
              <Comments />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtworkDescription;
