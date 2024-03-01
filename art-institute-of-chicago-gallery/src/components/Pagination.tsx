interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}
  
function Pagination({ page, setPage, totalPages }: PaginationProps) {
    return (
        <ul className="text-4xl flex justify-center align-middle py-10">
            <button disabled={page <= 1} className="px-1 disabled:text-gray-300" onClick={()=>(setPage(Math.max(page - 10, 1)))}>{"≪"}</button>
            {Array(4).fill(null).map((value, index)=>{
                const newPage = page - (4 - index);
                if(newPage < 1){
                    return null;
                }
                return (
                    <button className="px-1" key={newPage} onClick={()=>(setPage(newPage))}>{newPage}</button>
                );
            })}
            <span className="text-orange-600 text-6xl">{page}</span>
            {Array(4).fill(null).map((value, index)=>{
                const newPage = page + index + 1;
                if(newPage > totalPages){
                    return null;
                }
                return (
                    <button className="px-1" key={newPage} onClick={()=>(setPage(newPage))}>{newPage}</button>
                );
            })}
            <button disabled={(totalPages - page) < 10} className="px-1 disabled:text-gray-300" onClick={()=>(setPage(Math.min(page + 10, totalPages)))}>{"≫"}</button>
        </ul>
    );
}

export default Pagination;
