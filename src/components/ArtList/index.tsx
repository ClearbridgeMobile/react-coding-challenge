import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Grid, Pagination } from "@mui/material";
import ArtCard from '../ArtCard';
import { useAppContext } from '../../AppContext';
import "./artList.css"



const ArtList = () => {
    const [artData, setArtData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { pagination, setPagination } = useAppContext();
    //main fetch api request method with storing data in local state
    const fetchData = async (current_page = pagination.current_page, limit = 10) => {
        try {
            const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${current_page}&limit=${limit}`);
            if (!response.ok) throw new Error("Network issue, Please try again letter");

            const result = await response.json();
            setArtData(result.data);
            setPagination(result.pagination);
            setIsLoading(false);

        } catch (err: any) {
            setError(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {

        fetchData();

    }, [])


    //method to handle pagination flow and fetch according new selection
    const hanglePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        fetchData(page, 10);
    };

    return <>
        <div className="cover-page">
            <h1 className='cover-text'>Chicago Art Gallary</h1>
        </div>
        {/* initially render spiner until api execute finish, then it will render list of art or error according api response */}
        <div className='app-body'>
            {isLoading ?
                <div className='loading-spinner'><RotatingLines /></div>
                : (!isLoading && error) ?
                    <h2 className='error-text'>{error}</h2>
                    : <Grid container spacing={2}>{artData.map((info: art, index) => <ArtCard data={info} key={index}></ArtCard>)}</Grid>
            }
            {/* Pagination comoponent  */}
            <div className='app-pagination'>
                <Pagination size="large" color='primary' count={pagination.total_pages} boundaryCount={3} page={pagination.current_page} onChange={hanglePageChange} />

            </div>
        </div>
    </>
}

export default ArtList;