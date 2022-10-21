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
        minWidth: { xs: "100%", sm: "100%", md: "100%", lg: "200px" },
        height: "50px  !important",
        borderRadius: "1px  !important",
        transition: "0.3s  !important",
        textTransform: "none  !important",
        fontSize: "16px  !important",
        fontWeight: "fontWeightBold  !important",
        border: "3px solid #000  !important",
        color: "#ffedd5 !important",
        boxShadow: "5px 5px 5px #000  !important",
        backgroundColor: '#018e39 !important',
        "&:hover": {
          border: "3px solid #000  !important",
          background: "#006636  !important",
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
