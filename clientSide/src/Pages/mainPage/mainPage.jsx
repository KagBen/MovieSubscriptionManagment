import { Stack, Box } from "@mui/material";
import NavBar from "../components/navBar";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <Stack direction={"row"}>
        <NavBar />
        <Box sx={{ flexGrow: "0.95", backgroundColor: "primary.main" }}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default MainPage;
