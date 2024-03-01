import { createSearchParams, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import Artwork from "./Artwork";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import { useDebounce } from "../hooks/useDebounce";

interface ArtWorkType {
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
  
function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultPage = searchParams.get('page');
    const defaultSearch = searchParams.get('search');

    const [artworks, setArtworks] = useState<ArtWorkType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrors] = useState(null);
    const [search, setSearch] = useState(defaultSearch || 'cats');

    const [page, setPage] = useState(parseInt(defaultPage || '0', 10) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [category, setCategory] = useState('');

    const debouncedFetch = useDebounce<{
        search: string;
        page: number;
    }>((args)=>{
        if(!args) {
            return;
        }
        const { search, page } = args;
        setSearchParams(createSearchParams({
                search,
                page: '' + page,
                category,
            })
        );
        setLoading(true);
        fetch(`https://api.artic.edu/api/v1/artworks${search? '/search' : ''}?limit=10&fields=id,title,image_id,thumbnail${search? '&q=' + search : ''}&page=${page} ${category? `&query[term][category_ids]=${category}` : ''}
        `)
        .then(data=>data.json())
        .then(data=>{
            setArtworks(data.data || []);
            setTotalPages(data.pagination.total_pages || 0);
            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
            setErrors(err);
        });
    }, 1000);

    useEffect(()=>{
        const prevSearch = searchParams.get('search');
        debouncedFetch({ search, page: prevSearch === search? page : 1 });
    }, [search, page, category, searchParams]);

    const updateCategory = useCallback((category: string) => {
        setPage(1);
        setCategory(category);
    }, []);

    return (
        <div className="App flex flex-col lg:flex-row space-y-10">
            <section>
                <h1 className="text-5xl font-sans py-10">Art Institute of Chicago Gallery</h1>
                <aside className="flex flex-col px-20 space-y-6">
                    <div className="flex flex-col">
                        <label className="text-3xl">Search</label>
                        <input type='search' value={search} onChange={event=>setSearch(event.target.value)} className="font-sans text-2xl text-center border-b-2"></input>
                    </div>
                    <CategoryFilter category={category} setCategory={updateCategory}/>
                </aside>
            </section>
            <section className="w-full lg:w-[90vw]">
                {error && <p>Something went wrong.</p>}
                {loading? <p>loading...</p>:
                    <>
                    <>
                        {artworks.length ? 
                            <div className="flex flex-wrap space-x-0 md:space-x-[6px] lg:space-x-[2px]">
                                {artworks.map((artwork)=>{
                                    return (<Artwork {...artwork}/>);
                                })}
                            </div>
                            : <p>No results.<br/>Try updating the search and filter</p>
                        }
                    </>
                    <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
                    </>
                }
            </section>

        </div>
    );
}

export default Home;
