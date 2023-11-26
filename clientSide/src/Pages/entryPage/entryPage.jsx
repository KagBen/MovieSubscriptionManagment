import React, { useState } from "react";
import {
  Stack,
  Typography,
  ButtonGroup,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import LoginRegComp from "./loginRegComp";
import TitleComp from "../components/title";
const backgroundImageUrl =
  "https://img.freepik.com/premium-photo/popcorn-red-striped-bucket-cinema-clapperboard-red-blue-background-cinema-concept_132254-1029.jpg";

const EntryPage = () => {
  const [_isLogin, setIsLogin] = useState(true);
  const [LoginbuttonStyle, setLogButtonStyle] = useState("contained");
  const [RegisterbuttonStyle, setRegButtonStyle] = useState("outlined");
  const RightStack = styled(Stack)(({ theme }) => ({
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    minHeight: "100vh",
    flexGrow: "0.6",
    boxShadow: "-5px 0 5px rgba(0, 0, 0, 0.5)", // Shadow from right side
  }));

  const handleLoginClick = () => {
    setIsLogin(true);
    setLogButtonStyle("contained");
    setRegButtonStyle("outlined");
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
    setLogButtonStyle("outlined");
    setRegButtonStyle("contained");
  };

  return (
    <>
      <Stack direction="row">
        <Stack sx={{ width: "35%" }} spacing={7}>
          <TitleComp />
          <Stack sx={{ padding: "40px" }}>
            <ButtonGroup
              variant="contained"
              color="primary"
              size="large"
              aria-label="login or register"
              disableElevation
              fullWidth={true}
            >
              <Button onClick={handleLoginClick} variant={LoginbuttonStyle}>
                Login
              </Button>
              <Button
                onClick={handleRegisterClick}
                variant={RegisterbuttonStyle}
              >
                Register
              </Button>
            </ButtonGroup>
            <LoginRegComp
              isLogin={_isLogin}
              handleLoginClick={handleLoginClick}
            />
          </Stack>
        </Stack>
        <RightStack>
          <Box sx={{ color: "white", backgroundColor: "black" }}>
            <Typography variant="h2">Welcome ...</Typography>
            <Typography variant="span">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis ad laboriosam officiis esse suscipit minima magni.
              Atque minima quos sapiente harum, ea fugiat animi repellendus
              numquam fugit magnam, impedit quaerat!
            </Typography>
          </Box>
        </RightStack>
      </Stack>
    </>
  );
};

export default EntryPage;
