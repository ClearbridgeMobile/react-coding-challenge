/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Context from "./Context";
const Pagination = () => {
  const {
    cardsperpage,
    pagenumber,
    setPagenumber,
    totalresults,
    setTotalresults,
  } = useContext(Context);
  let pages = [];
  for (let i = 1; i <= totalresults / cardsperpage; i++) {
    pages.push(i);
  }
  const pageset = (x) => {
    setPagenumber(x);
  };
  return (
    <div style={{ margin: "60px" }}>
      {pages.map((x, i) => (
        <Button
          key={i}
          onClick={() => pageset(x)}
          className="pagebuttons"
          variant={x === pagenumber ? "dark" : ""}
        >
          {x}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
