import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeWidget } from "../../store/modules/widgets/actions";
import { submitData, handleChange } from "../../Utils";
import { editWidgetThunk } from "../../store/modules/widgets/thunks";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./style.css";

export const Card = ({ name, yData, yAxis, ...rest }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(name);
  const [newYData, setNewYData] = useState(yData.join("|"));
  const [newYAxis, setNewYAxis] = useState(yAxis);
  const [inputNameError, setInputNameError] = useState(false);
  const [inputYDataError, setInputYDataError] = useState(false);

  const [openModel, setOpenModel] = useState(false);

  const widgets = useSelector((state) => state.widgets);

  useEffect(() => {
    setInputNameError(
      widgets.some((el) => el.name === newName && newName !== name)
    );
  }, [newName, widgets, name]);

  useEffect(() => {
    const regex = new RegExp(/^([1-9]\|)*[1-9]$/);
    setInputYDataError(newYData.search(regex) === -1);
  }, [newYData]);

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
    const error = inputYDataError || inputNameError;

    if (!error) {
      dispatch(
        editWidgetThunk({
          oldName: name,
          name: newName,
          yAxis: newYAxis,
          yData: newYData,
        })
      );
      handleCloseModel();
      handleCloseMenu();
    }
  };

  const options = {
    title: {
      text: null,
    },
    series: [
      {
        data: yData,
      },
    ],
    yAxis: {
      title: {
        text: yAxis,
      },
    },
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
                <Box
                  component="form"
                  onSubmit={(e) => submitData(e, { name, newName, newYData })}
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
                      error={inputNameError}
                      helperText={inputNameError ? "Name already exist" : ""}
                    />
                    <TextField
                      size="small"
                      id="inputYAxiosName"
                      label="yAxios' name"
                      variant="outlined"
                      value={newYAxis}
                      onChange={(e) => handleChange(e, setNewYAxis)}
                      sx={{ paddingBottom: "10px" }}
                    />
                    <TextField
                      size="small"
                      id="inputYData"
                      label="yData"
                      variant="outlined"
                      value={newYData}
                      onChange={(e) => handleChange(e, setNewYData)}
                      sx={{ paddingBottom: "10px" }}
                      error={inputYDataError}
                      helperText="example format: 1|3|2|7"
                    />
                    <Button variant="contained" onClick={() => handleEdit()}>
                      Change
                    </Button>
                  </Box>
                </Box>
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
