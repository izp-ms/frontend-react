import { Button } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  content: string;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const StyledButton = (props: Props) => {
  const { content, disabled, icon, onClick } = props;

  return (
    <>
      {icon ? (
        <Button
          sx={{ fontFamily: "Rubik" }}
          variant="contained"
          startIcon={icon}
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </Button>
      ) : (
        <Button
          sx={{ fontFamily: "Rubik" }}
          variant="contained"
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </Button>
      )}
    </>
  );
};
