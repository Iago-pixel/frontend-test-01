import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { handleChange } from "../../Utils";

import { useState } from "react";
import { FormModel } from "../../components/FormModal";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  inputSearch: {
    width: "35rem",
  },
  cardList: {
    marginBottom: "5rem",
  },
  mainBody: {
    padding: "2rem",
  },
  addButton: {
    color: "lightgray",
    fontSize: "5rem",
    position: "fixed",
    bottom: "3rem",
    right: "3rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  "@media (max-width: 425px)": {
    inputSearch: {
      width: "10rem",
    },
  },
});

export const Dashboard = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [search, setSearch] = useState("");

  const widgets = useSelector((state) => state.widgets);

  return (
    <div>
      <Header>
        <TextField
          className={classes.inputSearch}
          size="small"
          id="search"
          label="Search..."
          variant="outlined"
          value={search}
          onChange={(e) => handleChange(e, setSearch)}
        />
      </Header>
      <div className={classes.mainBody}>
        <div className={classes.cardList}>
          {search === ""
            ? widgets.map((e, i) => (
                <Card key={i} name={e.name} yData={e.yData} yAxis={e.yAxis} />
              ))
            : widgets
                .filter((e, i) => e.name.search(search) !== -1)
                .map((e, i) => (
                  <Card key={i} name={e.name} yData={e.yData} yAxis={e.yAxis} />
                ))}
        </div>
        <div>
          <Button onClick={handleOpen}>
            <AddCircleSharpIcon
              className={classes.addButton}
              sx={{ fontSize: "5rem" }}
            />
          </Button>
          <FormModel
            modalName="Add widget"
            buttonName="Add"
            type="add"
            openModel={open}
            handleCloseModel={handleClose}
          />
        </div>
      </div>
    </div>
  );
};
