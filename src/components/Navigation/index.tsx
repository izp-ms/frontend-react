import {
  AppBar,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useContext, useState } from "react";
import { DrawerList } from "../DrawerList";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useTypedDispatch, useTypedSelector } from "../../store";
import { AccountCircle } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { logout } from "../../store/auth.slice";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../StyledButton";
import { ColorModeContext } from "../../App";

import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Navigation = (props: Props) => {
  const { children } = props;

  const user = useTypedSelector((state) => state.auth.user);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const colorMode = useContext(ColorModeContext);

  const toggleDrawer = (): void => {
    setIsDrawerOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/home");
  };

  const handleMoveToRegisterView = (): void => {
    navigate("/register");
  };

  return (
    <>
      <AppBar>
        <Toolbar sx={{ height: 50, background: "primary" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsDrawerOpen(true)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <h1
            style={{ flexGrow: 1 }}
            onClick={() => {
              console.log(user);
            }}
          >
            Postcardia
          </h1>
          <h3 className={styles.theme} onClick={colorMode.toggleColorMode}>
            <Brightness4Icon />
          </h3>
          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleClose}>Log out</MenuItem>
              </Menu>
            </div>
          ) : (
            <StyledButton
              content="Sign In"
              icon={<LoginIcon />}
              onClick={handleMoveToRegisterView}
            />
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        onClose={toggleDrawer}
        open={isDrawerOpen}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerList setIsDrawerOpen={setIsDrawerOpen} />
      </Drawer>
      <div>{children}</div>
    </>
  );
};
