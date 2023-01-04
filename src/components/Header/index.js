import { useNavigate } from "react-router-dom";

import logo from "../../img/delfos.png";

import "./style.css";

export const Header = ({ children, ...rest }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div id="headerBar" {...rest}>
      <img src={logo} alt="logo" onClick={() => goHome()} />
      {children}
    </div>
  );
};
