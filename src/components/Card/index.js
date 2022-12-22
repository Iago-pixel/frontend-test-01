import "./style.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export const Card = ({ name, ...rest }) => {
  return (
    <div className="card" {...rest}>
      <header className="card-header">
        <h1 className="card-title">{name}</h1>
        <DragIndicatorIcon className="card-menu" />
      </header>
      <div className="card-body"></div>
    </div>
  );
};
