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
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import TitleComp from "./title";

const NavBar = () => {
  const userData = JSON.parse(sessionStorage.userData);
  console.log(userData);
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
            <Divider />
            {userData.role === "admin" && (
              <MenuItem>
                <ListItemIcon>
                  <PeopleAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Users(admin Only)</ListItemText>
                <LockPersonOutlinedIcon />
              </MenuItem>
            )}
          </MenuList>
        </Box>

        <ButtonGroup
          variant="outlined"
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
