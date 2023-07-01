import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import { navItems } from "../../mockData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";
import { Close } from "@mui/icons-material";

export const CustomDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  return (
    <>
      <div onClick={() => setOpen(true)} className="text-primary">
        <MenuIcon className="!m-3 !mr-6" />
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ className: "!w-3/4 !rounded-tr-xl !rounded-br-xl" }}
      >
        <List className="">
          <ListItem className="!flex  !justify-between !text-2xl lg:!text-4xl !text-primary !py-3 !text-center !font-bold">
            <span>Edu-Villa™</span>{" "}
            <Close onClick={() => setOpen(false)} className="!text-[32px]" />
          </ListItem>
          <Divider />
          {navItems.map((item, index) => (
            <ListItemButton
              key={item.id}
              className="!text-primary !p-4 !font-semibold !text-lg"
              onClick={() => {
                navigate(
                  Object.keys(userData).length === 0 && item.to === "/profile"
                    ? "/login"
                    : item.to
                );
                setOpen(false);
              }}
            >
              <ListItemIcon className="!text-primary">{item.icon}</ListItemIcon>
              <p>{item.item}</p>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
