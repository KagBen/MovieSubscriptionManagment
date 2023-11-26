import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const LoginRegComp = ({ isLogin, handleLoginClick }) => {
  const [userData, setUserData] = useState({});
  const nav = useNavigate();
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const loginToServer = async () => {
    try {
      const loginUser = await axios.post("http://localhost:3000/users/login", {
        userLoginInfo: userData,
      });
      sessionStorage.userToken = loginUser.data.token;
      sessionStorage.userData = JSON.stringify(loginUser.data.user);
      //! dont forget if it first time /(check if name is already setted then to home if not immidatly to settings )
      nav("/home");
      toast.success("User logged in");
    } catch (err) {
      toast.error(await err.response.data.message);
    }
  };

  const RegisterUserToServer = async () => {
    try {
      const RegisterUser = await axios.patch(
        "http://localhost:3000/users/register",
        {
          userRegisterInfo: userData,
        }
      );
      console.log(RegisterUser);
      toast.success("User register Successfully");
      handleLoginClick();
    } catch (err) {
      console.log(err);
      toast.error(await err.response.data.message);
    }
  };

  return (
    <>
      <Stack mt={4} spacing={2}>
        {isLogin ? (
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Login
          </Typography>
        ) : (
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Register
          </Typography>
        )}

        <TextField
          onChange={handleUserData}
          label="Username"
          name="username"
          variant="outlined"
        />
        <TextField
          onChange={handleUserData}
          name="password"
          label={isLogin ? "Password" : "New password"}
          type="password"
        />
        {isLogin ? (
          <Button variant="contained" onClick={loginToServer}>
            Login
          </Button>
        ) : (
          <Button variant="contained" onClick={RegisterUserToServer}>
            Register
          </Button>
        )}
      </Stack>
    </>
  );
};

export default LoginRegComp;
