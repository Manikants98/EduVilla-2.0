import classNames from "classnames";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { navItems } from "../../mockData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ open, setOpen, setSelected }) => {
  const userData = useSelector((state) => state.userData);

  return (
    <div className="flex fixed z-40 lg:z-0">
      <div
        className={classNames(
          "flex flex-col shadow-gray-400 bg-white shadow-card absolute top-0 h-screen",
          open
            ? "w-40 transition-all duration-200"
            : "w-[45px] transition-all duration-200"
        )}
      >
        {navItems.map((item) => (
          <Link
            className={classNames(
              "flex p-2 border-b-2 cursor-pointer hover:bg-slate-200",
              window.location.pathname === item.to
                ? "bg-primary hover:bg-primary shadow-card text-white"
                : "bg-white text-primary"
            )}
            key={item.id}
            onClick={() => {
              setSelected(item.id);
            }}
            to={
              Object.keys(userData).length === 0 && item.to === "/profile"
                ? "/login"
                : item.to
            }
          >
            {item.icon}
            {open && (
              <span className="ml-2 whitespace-nowrap"> {item.item} </span>
            )}
          </Link>
        ))}
        <button
          onClick={() => setOpen(!open)}
          className="flex text-primary p-2.5"
        >
          {open ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
