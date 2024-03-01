import ArtworkImage from "./ArtworkImage";
import { Link } from "react-router-dom";

interface ArtWorkPropType {
    id: string;
    title: string;
    image_id: string;
    thumbnail: {
        alt_text: string;
        width: number;
        lqip: string;
        height: number;
    }
}
  
function Artwork({ id, thumbnail, image_id, title }: ArtWorkPropType) {
    return (
        <Link to={`/artwork/${id}`} className="w-full md:w-[calc(50%-6px)] lg:w-[calc(20%-2px)]">
            <article key={id}>
                <div className="w-full h-80 overflow-hidden">
                    <ArtworkImage thumbnail={thumbnail} image_id={image_id} className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-full min-w-full"/>
                </div>
                
                <h3 className="py-5 text-2xl">{title}</h3>
            </article>
        </Link>
    );
}

export default Artwork;
