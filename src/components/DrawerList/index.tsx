import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PagesIcon from "@mui/icons-material/Pages";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerList = (props: Props) => {
  const { setIsDrawerOpen } = props;

  const navigate = useNavigate();

  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setIsDrawerOpen(false)}
      onKeyDown={() => setIsDrawerOpen(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/postcards")}>
            <ListItemIcon>
              <PagesIcon />
            </ListItemIcon>
            <ListItemText primary="Postcards" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/friends")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/settings")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
