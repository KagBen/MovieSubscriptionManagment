import { Typography } from "@mui/material";

const TitleComp = () => {
  return (
    <Typography variant="h2" color="initial" sx={{pl:"4px"}}>
      Movi
      <Typography
        variant="span"
        fontSize={"65px"}
        color="initial"
        fontWeight={"bold"}
        sx={{ color: "primary.main" }}
      >
        X
      </Typography>
    </Typography>
  );
};
export default TitleComp;
