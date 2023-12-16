import { Box } from "@mui/material";
import styles from "./styles.module.scss";

export const AdminPanel = () => {
  return (
    <Box className={styles.container} sx={{ color: "text.primary" }}>
      <h1>AdminPanel</h1>
    </Box>
  );
};
