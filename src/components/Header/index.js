import logo from "../../img/delfos.png";
import "./style.css";

export const Header = ({ children, ...rest }) => {
  return (
    <div id="headerBar" {...rest}>
      <img src={logo} alt="logo" />
      {children}
    </div>
  );
};
