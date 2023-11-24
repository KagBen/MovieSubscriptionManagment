import React, { useState } from "react";
import {
  Stack,
  Typography,
  ButtonGroup,
  Button,
  Container,
  Avatar,
} from "@mui/material";
import { ThemeProvider, styled } from "@mui/system";
import theme from "../../Theme";
import LoginRegComp from "./loginRegComp";

const EntryPage = () => {
  const [_isLogin, setIsLogin] = useState(true);

  const RightStack = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    minHeight: "100vh",
    flexGrow: "0.8",
  }));

  return (
    <>
      <Stack direction="row">
        <Stack sx={{ flexGrow: "0.2" }}>
          <Typography variant="h1" color="initial">
            Movi
            <Typography
              variant="span"
              color="initial"
              sx={{ color: "primary.main" }}
            >
              X
            </Typography>
          </Typography>
          <Stack
            sx={{ padding: "40px", border: "1px solid"}}
          >
            <ButtonGroup
              variant="contained"
              color="primary"
              size="large"
              aria-label="login or register"
              disableElevation
              fullWidth={true}
            >
              <Button onClick={() => setIsLogin(true)}>Login</Button>
              <Button onClick={() => setIsLogin(false)}>Register</Button>
            </ButtonGroup>
            <LoginRegComp isLogin={_isLogin} />
          </Stack>
        </Stack>
        <RightStack>
          <Typography variant="h1" color="initial">
            image part
          </Typography>
        </RightStack>
      </Stack>
    </>
  );
};

export default EntryPage;
