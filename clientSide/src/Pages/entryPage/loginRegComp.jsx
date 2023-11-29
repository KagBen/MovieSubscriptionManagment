import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { loginToServer, RegisterUserToServer } from "../../utils/authUtils";
const LoginRegComp = ({ isLogin, handleLoginClick }) => {
  const [userData, setUserData] = useState({});
  const nav = useNavigate();

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
          <Button
            variant="contained"
            onClick={() => {
              loginToServer(nav, toast, userData);
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              RegisterUserToServer(toast, handleLoginClick, userData);
            }}
          >
            Register
          </Button>
        )}
      </Stack>
    </>
  );
};

export default LoginRegComp;
