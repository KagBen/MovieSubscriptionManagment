import { Typography, Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
const MoviesPage = () => {
  const allMovies = useSelector((state) => state.movies.movies);
  return (
    <>
      <Box
        sx={{ backgroundColor: "primary.light", width: "100%", height: "100%" }}
      >
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
        {console.log(allMovies)}
      </Box>
    </>
  );
};

export default MoviesPage;
