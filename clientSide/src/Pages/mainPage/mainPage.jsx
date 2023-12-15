import { Stack, Box } from "@mui/material";
import NavBar from "../components/navBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AuthLogout } from "../../utils/authUtils";
import { useDispatch } from "react-redux";
import { loadMovies } from "../../Redux/Actions/moviesAction";
import { loadMembers } from "../../Redux/Actions/membersAction";
import { loadUsers } from "../../Redux/Actions/usersAction";
import { loadSubscriptions } from "../../Redux/Actions/subscriptionsAction";
const MainPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
 

  useEffect(() => {
    dispatch(loadMovies(sessionStorage.userToken));
    dispatch(loadMembers(sessionStorage.userToken));
    dispatch(loadSubscriptions(sessionStorage.userToken));
     dispatch(loadUsers());
  }, []);

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
        <Box sx={{ flexGrow: "0.95", backgroundColor: "primary.main" , py:"10px" }}>
          <Outlet/>
        </Box>
      </Stack>
    </>
  );
};

export default MainPage;
