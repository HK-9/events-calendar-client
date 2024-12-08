import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserAvatarSetting from "../components/NavBar/UserAvatarSetting";
import { useAppContext } from "../context/AppContex";

const AppHeader = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event Calendar
          </Typography>
          {isAuthenticated && <UserAvatarSetting />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AppHeader;
