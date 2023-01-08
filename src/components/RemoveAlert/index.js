import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

import { submitData } from "../../Utils";
import { removeWidget } from "../../store/modules/widgets/actions";

import { useDispatch } from "react-redux";

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
    color: "grey",
    marginBottom: "1rem",
  },
});

export const RemoveAlert = ({
  openModel,
  handleCloseModel,
  widgetName,
  ...rest
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ name: widgetName }));
    handleCloseModel();
  };

  return (
    <Modal open={openModel} onClose={handleCloseModel} {...rest}>
      <Box component="form" onSubmit={(e) => submitData(e, { widgetName })}>
        <Box className={classes.formBox}>
          <Typography
            className={classes.modalTitle}
            sx={{ fontWeight: "bold" }}
            component="h1"
          >
            Are you sure you want to remove??
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "1rem" }}
            onClick={() => handleRemove()}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
