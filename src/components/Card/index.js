import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

import { useState } from "react";
import { useDispatch } from "react-redux";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { removeWidget } from "../../store/modules/widgets/actions";
import { FormModel } from "../FormModal";

const useStyles = makeStyles({
  card: {
    border: "1px grey solid",
    marginBottom: "2rem",
  },
  cardHeader: {
    borderBottom: "1px grey solid",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "lightgrey",
  },
  cardTitle: {
    margin: "0",
    fontSize: "1.5rem",
    padding: "10px",
  },
  cardMenu: {
    "&hover": {
      cursor: "pointer",
    },
  },
  cardBody: {
    padding: "1rem",
  },
});

export const Card = ({ name, yData, yAxis, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openModel, setOpenModel] = useState(false);

  const handleOpenModel = () => {
    setOpenModel(true);
  };
  const handleCloseModel = () => {
    setOpenModel(false);
    handleCloseMenu();
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    dispatch(removeWidget({ name }));
    handleCloseMenu();
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
    <div className={classes.card} {...rest}>
      <header className={classes.cardHeader}>
        <h1 className={classes.cardTitle}>{name}</h1>
        <div>
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpenMenu}
          >
            <DragIndicatorIcon className={classes.cardMenu} />
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
              <FormModel
                modalName="Edit widget"
                buttonName="Change"
                type="edit"
                openModel={openModel}
                handleCloseModel={handleCloseModel}
                actualNameWidget={name}
                actualYData={yData}
                actualYAxis={yAxis}
                handleCloseMenu={handleCloseMenu}
              />
            </div>
            <MenuItem onClick={handleRemove}>Remove</MenuItem>
          </Menu>
        </div>
      </header>
      <div className={classes.cardBody}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};
