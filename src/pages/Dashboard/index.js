import { Header } from "../../components/Header";
import { TextField } from "@mui/material";
import { Card } from "../../components/Card";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import "./style.css";

export const Dashboard = () => {
  return (
    <body>
      <Header>
        <TextField
          sx={{ width: "35rem" }}
          size="small"
          id="search"
          label="Search..."
          variant="outlined"
        />
      </Header>
      <main>
        <Card name="teste" />
        <AddCircleSharpIcon
          sx={{
            color: "lightgray",
            fontSize: "5rem",
            position: "fixed",
            bottom: "3rem",
            right: "3rem",
          }}
        />
      </main>
    </body>
  );
};
