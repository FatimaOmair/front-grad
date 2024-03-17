import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Avatar } from "@mui/material";
import DotBadge from "../../shared/Badge.jsx";
export default function Navbar({ showDrawer }) {
  return (
    <>
      <AppBar
        sx={{
          width: { md: "calc(100% - 240px)" },
          ml: { xs: 0, md: "240px" },
          backgroundColor: "rgba(43, 1, 62, 0.5)",
        }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="#fff"
            aria-label="menu"
            sx={{ mr: 2, display: { md: "none" } }}
            onClick={() => {
              showDrawer();
            }}
          >
            <MenuIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#000" }}
          >
          </Typography>
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"center", color:"#fff"}} >
          <IconButton>
          <DotBadge icon={NotificationsActiveIcon} />
            </IconButton>
            <Avatar src="image/steve.png"sx={{mx:1}}/>
            <Typography>Hi, Admin</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}