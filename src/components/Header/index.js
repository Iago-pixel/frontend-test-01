import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import logo from "../../img/delfos.png";

// import "./style.css";

const useStyles = makeStyles({
  headerBar: {
    height: "3rem",
    borderBottom: "1px grey solid",
    padding: "5px 1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    height: "2.5rem",
    width: "auto",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export const Header = ({ children, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className={classes.headerBar} {...rest}>
      <img
        className={classes.logo}
        src={logo}
        alt="logo"
        onClick={() => goHome()}
      />
      {children}
    </div>
  );
};
