const getPagedUrl = (page) => {
    if (!page) return "https://api.artic.edu/api/v1/artworks";
    else return `https://api.artic.edu/api/v1/artworks?page=${page}`;
  };


export {
    getPagedUrl
}