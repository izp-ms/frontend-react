import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress size={80} />
    </div>
  );
};

export default LoadingSpinner;
