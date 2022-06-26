import { Button } from "@mui/material";
import React from "react";

interface IProps {
  children: React.ReactNode;
  onClick?: (arg?: any) => void;
}

// { size = '16px', stroke, ...rest }: { size?: string; stroke?: string }) {

const StyledButton = ({ children, ...rest }: IProps) => {
  return (
    <Button
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "200px" },
        height: "50px",
        borderRadius: "1rem",
        transition: "0.3s",
        textTransform: "none",
        fontSize: "20px",
        fontWeight: "fontWeightBold",
        border: "1px solid",
        borderColor: "primary.dark",
        color: "primary.light",

        "&:hover": {
          border: "1px solid",
          borderColor: "primary.main",
        },
      }}
      variant="contained"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
