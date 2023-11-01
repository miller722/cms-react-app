import React from "react";
import { Link, useLocation } from "react-router-dom";

const Tab = ({ tab }) => {
  let location = useLocation();

  return (
    <div className={location.pathname.includes(tab.id) ? "tab active" : "tab"}>
      <Link to={`/${tab.id}`}>{tab.title}</Link>
    </div>
  );
};

export default Tab;
