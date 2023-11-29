import { Stack, Box } from "@mui/material";
import NavBar from "../components/navBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthLogout } from "../../utils/authUtils";
const MainPage = () => {
  const [timeRemain, updateTime] = useState();
  const nav = useNavigate();

  //   const logoutF = async () => {
  //     try {
  //       const logoutUser = await axios.get("http://localhost:3000/users/logout");
  //       sessionStorage.clear();
  //       nav("/");

  //       toast.success(logoutUser.data);
  //     } catch (err) {
  //       console.log(err);
  //       toast.error(await err.response.data.message);
  //     }
  //   };

  useEffect(() => {
    const sessionExpirationInMillis = localStorage.getItem(
      "sessionExpirationTime"
    );
    if (sessionExpirationInMillis < Infinity && sessionExpirationInMillis) {
      const remainingTimeInMillis =
        sessionExpirationInMillis - new Date().getTime();
      console.log(remainingTimeInMillis / 1000 / 60);
      if (remainingTimeInMillis <= 0) {
        AuthLogout(nav, toast);
        toast.success("Session time is over - user logged out");
      } else {
        const timeoutId = setTimeout(async () => {
          await AuthLogout(nav, toast);
          toast.success("Session time is over - user logged out");
        }, remainingTimeInMillis); // Add a delay of 0 milliseconds

        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  return (
    <>
      <Stack direction={"row"}>
        <NavBar
          timeRemaining={
            (localStorage.getItem("sessionExpirationTime") -
              new Date().getTime()) /
            60000
          }
        />
        <Box sx={{ flexGrow: "0.95", backgroundColor: "primary.main" }}>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default MainPage;
