import { useEffect, useState } from "react";

function CategoryFilter({ category, setCategory }: { category: string; setCategory: (category: string) => void; }) {
    const [categories, setCategories] = useState([]);
    const [total, setTotal] = useState(0);
    const [from, setFrom] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        fetch(`https://api.artic.edu/api/v1/category-terms/search?size=6&from=${from}`)
        .then(data=>data.json())
        .then(data=>{
            setCategories(data.data);
            setTotal(data.pagination.total);
            setLoading(false);
        })
        .catch(err=>{
            setLoading(false);
            setError(err);
        });
    }, [from]);
  
    return (
        <div className="text-xl">
            <h4 className="text-3xl">Categories</h4>
            {error && <p>Something went wrong loading categories.</p>}
            {!loading && <>
                <button className="disabled:text-gray-300" onClick={()=>{
                    setCategory('');
                    setFrom(from - 6);
                }} disabled={from <= 5}>▴</button>
                <ul className="font-sans">
                    {categories.map(({ id, title })=>(
                    <li key={id} className={category === id? 'text-orange-600' : ''}>
                        <button onClick={()=>(setCategory(category === id?'':id))}>{title}</button>
                    </li>))}
                </ul>
                <button className="disabled:text-gray-300" onClick={()=>{
                    setCategory('');
                    setFrom(from + 6);
                }} disabled={total <= from + 5}>▾</button>
            </>}
        </div>
    );
}

export default CategoryFilter;
