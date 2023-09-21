import { Button } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  content: string;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export const StyledButton = (props: Props) => {
  const { content, disabled, icon, onClick } = props;

  return (
    <>
      {icon ? (
        <Button
          variant="contained"
          startIcon={icon}
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </Button>
      ) : (
        <Button variant="contained" onClick={onClick} disabled={disabled}>
          {content}
        </Button>
      )}
    </>
  );
};
