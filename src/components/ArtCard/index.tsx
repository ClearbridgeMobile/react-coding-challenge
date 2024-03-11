import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import sample from "../../assets/sampleImage.jpg";
import "./artCard.css";

function validateResponse(response: any) {
    if (!response.ok) {
        return "";
    }
    return response;
}

const ArtCard = (data: any) => {
    const artData = data.data;
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState("");
    const [imgLoading, setImgLoading] = useState(true);

    // Fetch ArtThumbnail using image_id parameter
    useEffect(() => {
        fetch(`https://www.artic.edu/iiif/2/${artData.image_id}/full/843,/0/default.jpg`)
            .then(validateResponse)
            .then(response => response && response.blob())
            .then(blob => {
                blob && setImgSrc(URL.createObjectURL(blob));
                setImgLoading(false);
            })

    }, [data])


    //naviaget to individual art detail page
    const artClick = () => {
        navigate(`/home/${artData.id}`, { state: { ...artData, thubnail: imgSrc } });
    }

    return <>
        <Grid item xs={12} sm={6} md={4} lg={4} onClick={() => artClick()}>
            {data && <div className="art-card">
                {/* using static sample image from assets folder if request doesn't find image */}
                {!imgLoading && <img src={imgSrc || sample} className="art-img" />}
                <h3 className="art-title">{artData.title}</h3>
            </div>}
        </Grid>
    </>
}

export default ArtCard;