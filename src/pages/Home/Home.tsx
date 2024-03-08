import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

interface Props {
  curPg: number;
  setCurPg: (num: number) => void;
}

interface ArtistObj {
  id: number;
  title: string;
  image_id: string;
}

const PAGINATION_LIMIT = 10;

const Home: React.FC<Props> = ({ curPg, setCurPg }) => {
  const { pg } = useParams();
  const [artworksArr, setArtworksArr] = useState<ArtistObj[]>();
  // const [curPg, setCurPg] = useState();
  const [totalPgs, setTotalPgs] = useState<number>();
  const [nextLink, setNextLink] = useState<string>();
  const [prevLink, setPrevLink] = useState<string>();

  useEffect(() => {
    const initPg = pg || 1;
    const initUrl = `https://api.artic.edu/api/v1/artworks?page=${initPg}&limit=${PAGINATION_LIMIT}`;
    const fetchArtworks = async (url: string) => {
      const artworks = await axios.get(url);
      console.log(artworks);

      setCurPg(artworks.data.pagination.current_page);
      setTotalPgs(artworks.data.pagination.total_pages);
      setNextLink(artworks.data.pagination.next_url);
      setArtworksArr(artworks.data.data);
    };

    fetchArtworks(initUrl);
  }, []);

  const handleNextClick = async () => {
    if (nextLink) {
      const page = await axios.get(nextLink);

      setCurPg(page.data.pagination.current_page);
      setNextLink(page.data.pagination.next_url);
      setPrevLink(page.data.pagination.prev_url);
      setArtworksArr(page.data.data);
    }
  };

  const handlePrevClick = async () => {
    if (prevLink) {
      const page = await axios.get(prevLink);

      setCurPg(page.data.pagination.current_page);
      setNextLink(page.data.pagination.next_url);
      setPrevLink(page.data.pagination.prev_url);
      setArtworksArr(page.data.data);
    }
  };

  const handlePgBtnClick = async (e: MouseEvent) => {
    const pgNum = +(e.target as HTMLButtonElement).innerHTML;
    const page = await axios.get(
      `https://api.artic.edu/api/v1/artworks?page=${pgNum}&limit=${PAGINATION_LIMIT}`
    );

    setCurPg(page.data.pagination.current_page);
    setNextLink(page.data.pagination.next_url);
    setPrevLink(page.data.pagination.prev_url);
    setArtworksArr(page.data.data);
  };

  const lowFivePgs = (function () {
    let lowFive: number[] = [];

    if (curPg! > 5) {
      for (let i = curPg! - 5; i < curPg!; i++) {
        lowFive.push(i);
      }
    } else {
      lowFive = [1, 2, 3, 4, 5];
    }

    return lowFive;
  })();

  const highFivePgs = (function () {
    const highFive: number[] = [];

    if (curPg! > totalPgs! - 5) {
      for (let i = curPg!; i < totalPgs!; i++) {
        highFive.push(i);
      }
    } else {
      for (let i = totalPgs! - 5; i < totalPgs!; i++) {
        highFive.push(i);
      }
    }

    return highFive;
  })();

  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {artworksArr?.map((art) => {
          return (
            <li key={art.id}>
              <Link to={`/details/${art.id}`}>{art.title}</Link>
            </li>
          );
        })}
      </ul>
      <button onClick={handlePrevClick}>Prev</button>
      {lowFivePgs.map((pg) => {
        return <button onClick={handlePgBtnClick}>{pg}</button>;
      })}
      <span style={{ margin: "0 5px" }}>. . .</span>
      {highFivePgs.map((pg) => {
        return <button onClick={handlePgBtnClick}>{pg}</button>;
      })}
      <button onClick={(e) => handleNextClick(e)}>Next</button>
    </div>
  );
};

export default Home;
