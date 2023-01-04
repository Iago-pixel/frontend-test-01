import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { submitData, handleChange } from "../../Utils";

import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidgetThunk } from "../../store/modules/widgets/thunks";

import "./style.css";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [yData, setYData] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [inputNameError, setInputNameError] = useState(false);
  const [inputYDataError, setInputYDataError] = useState(false);
  const [search, setSearch] = useState("");

  const widgets = useSelector((state) => state.widgets);

  useEffect(() => {
    setInputNameError(widgets.some((el) => el.name === name));
  }, [name, widgets]);

  useEffect(() => {
    const regex = new RegExp(/^([1-9]\|)*[1-9]$/);

    if (yData !== "") {
      setInputYDataError(yData.search(regex) === -1);
    } else {
      setInputYDataError(false);
    }
  }, [yData]);

  const handleAddWidget = () => {
    const error = inputYDataError || inputNameError;

    if (yData === "") {
      setInputYDataError(true);
    } else {
      if (!error) {
        dispatch(addWidgetThunk({ name, yAxis, yData }));
        setName("");
        setYData("");
        setYAxis("");
        handleClose();
      }
    }
  };

  return (
    <div>
      <Header>
        <TextField
          sx={{ width: "35rem" }}
          size="small"
          id="search"
          label="Search..."
          variant="outlined"
          value={search}
          onChange={(e) => handleChange(e, setSearch)}
        />
      </Header>
      <main>
        <div id="card-list">
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
              sx={{
                color: "lightgray",
                fontSize: "5rem",
                position: "fixed",
                bottom: "3rem",
                right: "3rem",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
          >
            <form onSubmit={(e) => submitData(e, { name, yAxis, yData })}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "white",
                  border: "1px lightgrey solid",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  sx={{
                    color: "lightgrey",
                    marginBottom: "1rem",
                    fontWeight: "bold",
                  }}
                  component="h1"
                >
                  Add widget
                </Typography>
                <TextField
                  required
                  size="small"
                  id="inputName"
                  label="name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => handleChange(e, setName)}
                  sx={{ paddingBottom: "10px" }}
                  error={inputNameError}
                  helperText={inputNameError ? "Name already exist" : ""}
                />
                <TextField
                  required
                  size="small"
                  id="inputYData"
                  label="yData"
                  variant="outlined"
                  value={yData}
                  onChange={(e) => handleChange(e, setYData)}
                  sx={{ paddingBottom: "10px" }}
                  error={inputYDataError}
                  helperText="example format: 1|3|2|7"
                />
                <TextField
                  required
                  size="small"
                  id="inputYAxisName"
                  label="yAxis' name"
                  variant="outlined"
                  value={yAxis}
                  onChange={(e) => handleChange(e, setYAxis)}
                  sx={{ paddingBottom: "10px" }}
                />
                <Button variant="contained" onClick={handleAddWidget}>
                  Add
                </Button>
              </Box>
            </form>
          </Modal>
        </div>
      </main>
    </div>
  );
};
