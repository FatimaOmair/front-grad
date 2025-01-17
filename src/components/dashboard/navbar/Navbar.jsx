import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Avatar, Button } from "@mui/material";
import DotBadge from "../../shared/Badge.jsx";
import { UserContext } from "../../context/UserContextProvider.jsx";
import { useContext, useEffect, useState } from "react";
import { Link,useNavigate} from "react-router-dom";

export default function Navbar({ showDrawer }) {
  const { getUsers, setUserToken,setUserData} = useContext(UserContext);
  const [adminName, setAdminName] = useState("");
  const [adminImge, setAdminImge] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        
       
        const adminUser = res.users.find(user => user.role.includes("admin"));
      
        
        if (adminUser) {
          setAdminName(adminUser.name);
          setAdminImge(adminUser.img)
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
    navigate("/");
  };
  

  return (
    <>
      <AppBar
        sx={{
          width: { lg: "calc(100% - 240px)" },
          ml: { xs: 0, lg: "240px" },
          backgroundColor: "#003C43",
        }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="#fff"
            aria-label="menu"
            sx={{ mr: 2, display: { lg: "none" } }}
            onClick={() => {
              showDrawer();
            }}
          >
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#000" }}
          ></Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <IconButton>
              <DotBadge icon={NotificationsActiveIcon} />
            </IconButton>
            <Avatar src={adminImge || "image/steve.png"} sx={{ mx: 1 }} />

            <Typography>Hi, {adminName || 'Action'}</Typography>

            <Button
                key="Logout"
                sx={{
                  backgroundColor: "#135D66",
                  color: "#fff",
                  borderRadius: 5,
                  "&:hover": {
                    backgroundColor: "#77B0AA",
                  },
                  ml:2
                }}
                onClick={logOut}
                component={Link}
              >
                Logout
              </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
