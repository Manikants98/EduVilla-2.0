import React, { useState } from "react";
import classNames from "classnames";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Sidebar from "../shared/Sidebar";
const Layout = ({ component }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);


  return (
    <>
      <Header />
      <div className="flex top-0">
        <div
          className={classNames(
            "z-50 hidden lg:block",
            open ? "w-full lg:w-[10%]" : "w-full lg:w-12"
          )}
        >
          <Sidebar
            open={open}
            setOpen={setOpen}
            setSelected={setSelected}
            selected={selected}
          />
        </div>

        <div
          className={classNames(
            open ? "w-full lg:w-[90%]" : "w-full lg:w-[95%]"
          )}
        >
          {component}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
