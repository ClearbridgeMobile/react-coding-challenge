import React, { useState } from "react";
import "./App.css";
import Display from "./Components/Display";
import Context from "./Components/Context";

function App() {
  const [home, setHome] = useState("");
  const [homePage, setHomePage] = useState(true);
  const [page, setPage] = useState("");
  const [artDetails, setArtDetails] = useState();
  const [filterBy, setFilterBy] = useState("none");
  const [filtered, setFiltered] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [newData, setNewData] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const cardsperpage = 10;
  const [pagenumber, setPagenumber] = useState(1);
  const [totalresults, setTotalresults] = useState();
  const lastcardindex = pagenumber * cardsperpage;
  const firstcardindex = lastcardindex - cardsperpage;
  const [datas, setDatas] = useState();
  const cardsnumbers = datas && datas.slice(firstcardindex, lastcardindex);

  return (
    <div className="App">
      <Context.Provider
        value={{
          home,
          setHome,
          page,
          setPage,
          artDetails,
          setArtDetails,
          isSearching,
          setIsSearching,
          newData,
          setNewData,
          searchInput,
          setSearchInput,
          cardsperpage,
          pagenumber,
          setPagenumber,
          totalresults,
          setTotalresults,
          datas,
          setDatas,
          cardsnumbers,
          filterBy,
          setFilterBy,
          filtered,
          setFiltered,
          homePage,
          setHomePage,
        }}
      >
        <Display />
      </Context.Provider>
    </div>
  );
}

export default App;
