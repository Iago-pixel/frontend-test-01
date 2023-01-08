import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { submitData, handleChange } from "../../Utils";
import {
  addWidgetThunk,
  editWidgetThunk,
} from "../../store/modules/widgets/thunks";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  formBox: {
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
  },
  modalTitle: {
    color: "lightgrey",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
});

export const FormModel = ({
  modalName,
  buttonName,
  type,
  openModel,
  handleCloseModel,
  actualNameWidget = "",
  actualYData = [],
  actualYAxis = "",
  handleCloseMenu = () => {},
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(actualNameWidget);
  const [newYData, setNewYData] = useState(actualYData.join("|"));
  const [newYAxis, setNewYAxis] = useState(actualYAxis);
  const [inputNameError, setInputNameError] = useState(false);
  const [msgNameError, setMsgNameError] = useState("Name required");
  const [inputYDataError, setInputYDataError] = useState(false);

  const widgets = useSelector((state) => state.widgets);

  useEffect(() => {
    setInputNameError(
      widgets.some((el) => el.name === newName && newName !== actualNameWidget)
    );
  }, [newName, widgets, actualNameWidget]);

  useEffect(() => {
    const regex = new RegExp(/^([0-9]+\|)*[0-9]+$/);

    if (newYData !== "") {
      setInputYDataError(newYData.search(regex) === -1);
    } else {
      setInputYDataError(false);
    }
  }, [newYData]);

  useEffect(() => {
    if (newName === "") {
      setMsgNameError("Name required");
    } else {
      setMsgNameError("This name already exist");
    }
  }, [newName]);

  useEffect(() => {
    if (openModel && type === "add") {
      setNewName("");
      setNewYData("");
      setNewYAxis("");
    }
  }, [openModel, type]);

  const buttonHandle = () => {
    const error = inputYDataError || inputNameError;

    if (newYData === "" || newName === "") {
      if (newYData === "") {
        setInputYDataError(true);
      }
      if (newName === "") {
        setInputNameError(true);
      }
    } else {
      if (!error) {
        if (type === "add") {
          dispatch(
            addWidgetThunk({
              name: newName,
              yAxis: newYAxis,
              yData: newYData,
            })
          );
        } else if (type === "edit") {
          dispatch(
            editWidgetThunk({
              oldName: actualNameWidget,
              name: newName,
              yAxis: newYAxis,
              yData: newYData,
            })
          );
        }

        handleCloseModel();
        handleCloseMenu();
      }
    }
  };

  return (
    <Modal open={openModel} onClose={handleCloseModel} {...rest}>
      <Box
        component="form"
        onSubmit={(e) =>
          submitData(e, { actualNameWidget, newName, newYData, newYAxis })
        }
      >
        <Box className={classes.formBox}>
          <Typography className={classes.modalTitle} component="h1">
            {modalName}
          </Typography>
          <TextField
            required
            size="small"
            id="inputName"
            label="name"
            variant="outlined"
            value={newName}
            onChange={(e) => handleChange(e, setNewName)}
            sx={{ paddingBottom: "10px" }}
            error={inputNameError}
            helperText={inputNameError ? msgNameError : ""}
          />
          <TextField
            size="small"
            id="inputYAxisName"
            label="yAxis' name"
            variant="outlined"
            value={newYAxis}
            onChange={(e) => handleChange(e, setNewYAxis)}
            sx={{ paddingBottom: "10px" }}
          />
          <TextField
            required
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
          <Button variant="contained" onClick={() => buttonHandle()}>
            {buttonName}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
