import { Add, MenuOutlined } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import classNames from "classnames";

const CourcesDrawer = ({ setChapter, chapters, chapter }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        className="flex justify-center"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuOutlined />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Toolbar />

        <List className="!shadow-card !whitespace-nowrap !h-[87vh] !rounded !p-1 !w-72">
          {chapters?.map((i) => {
            return (
              <ListItemButton
                className={classNames(
                  "!rounded",
                  i.chapter_id === chapter && "!bg-black !text-white"
                )}
                onClick={() => {
                  setChapter(i.chapter_id);
                  setOpen(false);
                }}
              >
                {i.chapter_title}
              </ListItemButton>
            );
          })}
          <ListItemButton
            className="!flex !justify-between !rounded"
            onClick={() => {
              setChapter(null);
              setOpen(false);
            }}
          >
            Chapter <Add />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default CourcesDrawer;
