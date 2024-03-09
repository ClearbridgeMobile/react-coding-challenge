import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const GalleryTable = ({
  rows,
  page,
  rowsPerPage,
  total,
  handleChangePage,
  handleChangeRowsPerPage,
  showArtworkDetail,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Thumbnail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, title, category_titles, thumbnail }) => (
              <TableRow
                hover
                key={id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => showArtworkDetail(id)}
              >
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {category_titles}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={thumbnail.lqip}
                    height={thumbnail.height / 100}
                    width={thumbnail.width / 100}
                    alt={thumbnail.alt_text}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default GalleryTable;
