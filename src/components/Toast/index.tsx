import { Alert, Snackbar } from "@mui/material";

export type ToastStatus = "success" | "error" | "none";

interface Props {
  toastStatus: ToastStatus;
  errorMessage?: string;
  successMessage?: string;
  handleToastClose: () => void;
}

const AUTO_HIDE_DURATION = 5000;

export const Toast = (props: Props) => {
  const { toastStatus, errorMessage, successMessage, handleToastClose } = props;

  if (toastStatus === "success" && successMessage) {
    return (
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={toastStatus === "success"}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} variant="filled" severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    );
  }

  if (toastStatus === "error" && errorMessage) {
    return (
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={toastStatus === "error"}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    );
  }

  return null;
};
