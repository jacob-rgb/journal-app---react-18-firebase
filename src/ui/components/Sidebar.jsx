import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import { getUser } from "../../store/auth";
import { selectJournal } from "../../store/journal/journalSlice";
import { SidebarItem } from "./SidebarItem";

const meses = ['enero', 'febrero', 'marzo', 'abril'];

export const Sidebar = ({ drawerWidth = 240 }) => {

  const { displayName } = useSelector(getUser);

  const { notes } = useSelector(selectJournal);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          display: { xs: "block" },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
        }}
      >
        <Toolbar>
            <Typography variant="h6" noWrap> { displayName } </Typography>
        </Toolbar>
        <Divider />

        <List>
            {
               notes.map(note => (
                <SidebarItem key={note.id} note={note} />
               ))
            }
        </List>
      </Drawer>
    </Box>
  );
};
