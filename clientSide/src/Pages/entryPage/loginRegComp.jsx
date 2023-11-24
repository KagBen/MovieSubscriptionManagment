import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LoginRegComp = ({ isLogin }) => {
  const [userData, setUserData] = useState({});

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const loginToServer = async () => {
    try {
      const loginUser = await axios.post("http://localhost:3000/users/login", {
        userLoginInfo: userData,
      });
      toast.success("user logged in");
    } catch (err) {
      toast.error(err.response.data.message);
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
          <Button variant="contained">Register</Button>
        )}
      </Stack>
    </>
  );
};

export default LoginRegComp;
