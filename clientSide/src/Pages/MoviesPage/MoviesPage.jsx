import { Typography, Box, Button ,  Stack  } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const MoviesPage = () => {
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
        <Button startIcon={<AddIcon />} sx={{ textTransform: "none" , backgroundColor:"white" }}>
          Add Movie
        </Button>
      </Stack>
    </Box>
    </>
  );
};

export default MoviesPage;
