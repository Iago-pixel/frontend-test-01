import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const Home = () => {
  const navigate = useNavigate();

  const goDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" component="h1">
          How to use
        </Typography>
        <Typography variant="body1" component="span">
          In data put the Y axis values separated by "|". Example: "2|3|1|4|7"
        </Typography>
        <Button
          variant="contained"
          onClick={() => goDashboard()}
          sx={{ marginTop: "2rem" }}
        >
          Let's go
        </Button>
      </Box>
    </div>
  );
};
