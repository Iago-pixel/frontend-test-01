import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

import { useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { FormModel } from "../FormModal";
import { RemoveAlert } from "../RemoveAlert";

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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [openEditModel, setOpenEditModel] = useState(false);
  const [openRemoveModel, setOpenRemoveModel] = useState(false);

  const handleOpenRemoveModel = () => {
    setOpenRemoveModel(true);
  };

  const handleCloseRemoveModel = () => {
    setOpenRemoveModel(false);
    handleCloseMenu();
  };

  const handleOpenEditModel = () => {
    setOpenEditModel(true);
  };

  const handleCloseEditModel = () => {
    setOpenEditModel(false);
    handleCloseMenu();
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleOpenMenu}
          >
            <DragIndicatorIcon className={classes.cardMenu} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <div>
              <MenuItem onClick={() => handleOpenEditModel()}>Edit</MenuItem>
              <FormModel
                modalName="Edit widget"
                buttonName="Change"
                type="edit"
                openModel={openEditModel}
                handleCloseModel={handleCloseEditModel}
                actualNameWidget={name}
                actualYData={yData}
                actualYAxis={yAxis}
                handleCloseMenu={handleCloseMenu}
              />
            </div>
            <div>
              <MenuItem onClick={() => handleOpenRemoveModel()}>
                Remove
              </MenuItem>
              <RemoveAlert
                openModel={openRemoveModel}
                handleCloseModel={handleCloseRemoveModel}
                widgetName={name}
              />
            </div>
          </Menu>
        </div>
      </header>
      <div className={classes.cardBody}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};
