import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

export const Switchs = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
    </Routes>
  );
};
