import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Navbar, Sidebar } from "../../ui/components";

const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn" >
       < Navbar drawerWidth={drawerWidth} />
       <Sidebar drawerWidth={drawerWidth} />
      <Box component="main" sx={{flexGrow:1, p:3}}>
        <Toolbar />
        { children }
      </Box>
    </Box>
  );
};
