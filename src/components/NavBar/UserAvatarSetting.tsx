import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useGetUser } from "../../hooks/use-get-user.hook";
import { useLogout } from "../../hooks/use-logout.hook";
import { stringAvatar } from "../../helpers/utils";

const UserAvatarSetting: React.FC = () => {
  const { handleLogout } = useLogout();
  const { userData, getUserDetails } = useGetUser();

  useEffect(() => {
    getUserDetails();
  }, []);
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting: string) => {
    if (setting === "Logout") {
      handleLogout();
    }
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            {...stringAvatar(userData?.email || "X")}
            alt="Remy Sharp"
            src="/static/images/avatar/2.jpg"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserAvatarSetting;
