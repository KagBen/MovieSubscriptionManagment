import { Typography, Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import TableDataGrid from "./tableDataGrid";
const MoviesPage = () => {
  const allMovies = useSelector((state) => state.movies.movies);
  return (
    <>
      <Box
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: 2 }}
          >
            <Typography variant="span" color="initial" fontSize={"50px"}>
              Movies
            </Typography>
            <Button
              startIcon={<AddIcon />}
              sx={{ textTransform: "none", backgroundColor: "white" }}
            >
              Add Movie
            </Button>
          </Stack>
          <Box sx={{ alignSelf: "center", width: "95%" }}>
            <TableDataGrid allMovies={allMovies} />
          </Box>
            
        </Stack>
      </Box>
    </>
  );
};

export default MoviesPage;
