import { Stack, Box } from "@mui/material";
import NavBar from "../components/navBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MainPage = () => {
  const nav = useNavigate();

  const logoutF = async () => {
    try {
      const logoutUser = await axios.get("http://localhost:3000/users/logout");
      console.log(logoutUser);
      sessionStorage.clear();
      nav("/");
      toast.success(logoutUser.data);
    } catch (err) {
      console.log(err);
      toast.error(await err.response.data.message);
    }
  };
  const userDataObj = JSON.parse(sessionStorage.userData) || {};
  const sessionTimeout = userDataObj.sessionTimeOut || Infinity;
  const sessionTimeoutInMillis = sessionTimeout * 60 * 1000;

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      await logoutF();
      toast.success("Session time is over - user logged out");
    }, sessionTimeoutInMillis);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, []);
  
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
