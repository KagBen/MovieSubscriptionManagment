import {
  Stack,
  Box,
  Avatar,
  Typography,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
  ButtonGroup,
  Button,
} from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import TitleComp from "./title";

const NavBar = () => {
  const userData = JSON.parse(sessionStorage.userData);
  
  return (
    <>
      <Stack
        sx={{
          flexGrow: "0.05",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
        spacing={2}
      >
        <Box>
          <TitleComp />
          <Stack direction={"row"} sx={{ padding: "16px" }} spacing={2}>
            <Avatar
              alt={userData.username}
              src="/broken-image.jpg"
              sx={{ width: "50px", height: "50px", bgcolor: "primary.main" }}
            />
            <Box>
              <Typography variant="body1" color="initial">
                Welcome:{" "}
                {userData.userInfo.firstName + " " + userData.userInfo.lastName}
              </Typography>
              <Typography variant="body1" color="initial">
                Role: {userData.role}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <Stack sx={{ alignItems: "center", marginY: "7px" }}>
            <Box>
              <CountdownCircleTimer
                size={120}
                strokeWidth={4}
                isPlaying
                duration={
                  userData.sessionTimeOut
                    ? userData.sessionTimeOut * 60
                    : Infinity
                } // Convert duration to seconds
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
              >
                {({ remainingTime }) =>
                  userData.sessionTimeOut ? (
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" color="initial">
                        {Math.ceil(remainingTime / 60)}
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{ fontSize: "20px" }}
                        color="initial"
                      >
                        Minutes
                      </Typography>
                    </Box>
                  ) : (
                    <Stack sx={{ textAlign: "center", alignItems: "center" }}>
                      <AllInclusiveOutlinedIcon sx={{ fontSize: "40px" }} />
                      <Typography
                        variant="span"
                        sx={{ fontSize: "20px" }}
                        color="initial"
                      >
                        Minutes
                      </Typography>
                    </Stack>
                  )
                }
              </CountdownCircleTimer>
              <Typography
                variant="body2"
                sx={{ textAlign: "center", paddingTop: "5px" }}
                color="initial"
              >
                Remaining Time
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <SlideshowIcon />
              </ListItemIcon>
              <ListItemText>Movies</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText>Members</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SubscriptionsOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Subscriptions</ListItemText>
            </MenuItem>

            {userData.role === "admin" && (
              <MenuItem>
                <ListItemIcon>
                  <PeopleAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Users(admin Only)</ListItemText>
                <ListItemIcon>
                  <LockPersonOutlinedIcon />
                </ListItemIcon>
              </MenuItem>
            )}
          </MenuList>
        </Box>

        <ButtonGroup
          variant="text"
          size={"large"}
          disableElevation
          fullWidth={true}
        >
          <Button
            endIcon={<LogoutOutlinedIcon />}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
          <Button
            endIcon={<SettingsOutlinedIcon />}
            sx={{ textTransform: "none" }}
          >
            Settings
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  );
};

export default NavBar;
