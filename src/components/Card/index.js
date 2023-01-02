import "./style.css";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { removeWidget } from "../../store/modules/widgets/actions";
import { submitData, handleChange } from "../../Utils";
import { editWidgetThunk } from "../../store/modules/widgets/thunks";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Card = ({ name, data, ...rest }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(name);
  const [newData, setNewData] = useState(data.join("|"));

  const [openModel, setOpenModel] = useState(false);

  const handleOpenModel = () => {
    setOpenModel(true);
  };
  const handleCloseModel = () => setOpenModel(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    dispatch(removeWidget({ name }));
    handleCloseMenu();
  };

  const handleEdit = () => {
    dispatch(editWidgetThunk({ oldName: name, name: newName, data: newData }));
    handleCloseModel();
    handleCloseMenu();
  };

  const options = {
    title: {
      text: null,
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return (
    <div className="card" {...rest}>
      <header className="card-header">
        <h1 className="card-title">{name}</h1>
        <div>
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <DragIndicatorIcon className="card-menu" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <div>
              <MenuItem onClick={() => handleOpenModel()}>Edit</MenuItem>
              <Modal
                open={openModel}
                onClose={handleCloseModel}
                aria-labelledby="modal-modal-title"
              >
                <form
                  onSubmit={(e) => submitData(e, { name, newName, newData })}
                >
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
                      value={newName}
                      onChange={(e) => handleChange(e, setNewName)}
                      sx={{ paddingBottom: "10px" }}
                    />
                    <TextField
                      size="small"
                      id="inputData"
                      label="data"
                      variant="outlined"
                      value={newData}
                      onChange={(e) => handleChange(e, setNewData)}
                      sx={{ paddingBottom: "10px" }}
                    />
                    <Button variant="contained" onClick={() => handleEdit()}>
                      Change
                    </Button>
                  </Box>
                </form>
              </Modal>
            </div>
            <MenuItem onClick={handleRemove}>Remove</MenuItem>
          </Menu>
        </div>
      </header>
      <div className="card-body">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};
