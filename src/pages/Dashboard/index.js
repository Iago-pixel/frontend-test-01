import { Header } from "../../components/Header";
import { TextField } from "@mui/material";
import { Card } from "../../components/Card";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidgetThunk } from "../../store/modules/widgets/thunks";

import "./style.css";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const widgets = useSelector((state) => state.widgets);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleAddWidget = () => {
    // implementar lógica para proibir nome repetido
    dispatch(addWidgetThunk({ name, data }));
    setName("");
    setData("");
    handleClose();
  };

  const submitName = (e) => {
    e.preventDefault();
    console.log({ name });
  };

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
        {widgets.map((e, i) => (
          <Card key={i} name={e.name} data={e.data} />
        ))}
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
            <form onSubmit={submitName}>
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
                  size="small"
                  id="inputName"
                  label="name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => handleChange(e, setName)}
                  sx={{ paddingBottom: "10px" }}
                />
                <TextField
                  size="small"
                  id="inputData"
                  label="data"
                  variant="outlined"
                  value={data}
                  onChange={(e) => handleChange(e, setData)}
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
    </body>
  );
};
