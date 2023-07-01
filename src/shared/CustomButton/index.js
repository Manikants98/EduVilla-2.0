import { Button } from "@mui/material";
import classNames from "classnames";

export const CustomButton = ({
  children,
  className = "",
  size = "small",
  variant = "contained",
  type = "",
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      disableElevation
      variant={variant}
      className={classNames("!m-3 !capitalize ", className)}
      size={size}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
