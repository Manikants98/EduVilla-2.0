import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomDrawer } from "../Drawer";
import { Avatar, Menu, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { setUserData } from "../../Redux/Actions/UserData";
import { useDispatch } from "react-redux";
// import { useSnackbar } from "notistack";

const Header = () => {
  const navigate = useNavigate();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const action = (snackbarId) => (
  //   <>
  //     <div className="pl-1 !border-l-2">
  //       <Close
  //         className="cursor-pointer"
  //         onClick={() => {
  //           closeSnackbar(snackbarId);
  //         }}
  //       />
  //     </div>
  //   </>
  // );
  // const handleClickSnack = () => {
  //   enqueueSnackbar("Hello World", { action, variant: "success" });
  // };

  return (
    <>
      <div className="flex flex-row h-16 w-full lg:h-20 justify-between p-2 items-center sticky shadow-card bg-white bg-opacity-20 backdrop-blur-[8px] top-0 z-[999]">
        <div className="flex">
          <div className="block lg:hidden">
            <CustomDrawer />
          </div>
          <Link
            className="flex text-2xl lg:text-4xl drop-shadow items-center text-primary font-bold"
            to="/home"
          >
            Edu-Villa™
          </Link>
        </div>
        {/* <Button onClick={handleClickSnack}>Open</Button> */}

        <div className="flex items-center">
          {userData && userData.length === 0 && (
            <CustomButton
              variant="outlined"
              className="!rounded-full !p-2 w-32 lg:w-48"
            >
              <span
                className="mr-1 whitespace-nowrap"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </span>
              /
              <span
                className="ml-1 whitespace-nowrap"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </span>
            </CustomButton>
          )}
          {userData && Object.keys(userData).length !== 0 && (
            <>
              <div className="rounded-full mr-2 border-primary border-2 p-px bg-white">
                <Avatar
                  className="!bg-primary hover:opacity-90 lg:!w-12 lg:!h-12"
                  alt={userData.name}
                  src={userData.profile_url && userData.profile_url}
                  onClick={handleClick}
                >
                  {userData.name && userData.name.slice(0, 1)}
                </Avatar>
              </div>
            </>
          )}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className="!flex !top-4 lg:!top-5"
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {userData && Object.keys(userData).length !== 0 && (
              <div className="flex flex-col my-1 items-center rounded ">
                <div className="flex flex-col items-center border-t pb-3 w-60 mt-10 pt-12 bg-white">
                  <h1 className="font-bold text-lg text-primary">
                    {userData.name}
                  </h1>
                  <h1 className="text-xs">{userData.email}</h1>
                </div>
                <div className="rounded-full absolute border-primary border-2 p-px bg-white">
                  <Avatar
                    className="!bg-primary hover:opacity-90 !h-20 !w-20"
                    alt={userData.name}
                    src={userData.profile_url && userData.profile_url}
                  >
                    {userData.name && userData.name.slice(0, 1)}
                  </Avatar>
                </div>
              </div>
            )}
            <Divider />
            <div className="flex justify-between mx-1 pt-1">
              <div
                className="cursor-pointer px-2 rounded p-1 hover:bg-gray-100"
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
              >
                View Profile
              </div>
              <div
                className="cursor-pointer px-2 rounded p-1 hover:bg-gray-100"
                onClick={() => {
                  navigate("/");
                  handleClose();
                  dispatch(setUserData({}));
                  localStorage.setItem("token", null);
                  window.location.reload();
                }}
              >
                Log Out
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Header;
