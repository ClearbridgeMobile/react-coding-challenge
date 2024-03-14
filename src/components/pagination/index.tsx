import { Button } from "@mui/material";
interface IProps {
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
}
const Pagination = ({ prevPage, nextPage, currentPage }: IProps) => {
  return (
    <div className="text-center pagination">
      <Button onClick={prevPage} variant="contained">
        Previous
      </Button>
      <span>{currentPage}</span>
      <Button variant="contained" onClick={nextPage}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
