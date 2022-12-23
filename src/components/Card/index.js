import "./style.css";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { removeWidget } from "../../store/modules/widgets/actions";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Card = ({ name, data, ...rest }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    dispatch(removeWidget({ name }));
    handleClose();
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
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
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
