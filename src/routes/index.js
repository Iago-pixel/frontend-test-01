import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";

export const Switchs = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
