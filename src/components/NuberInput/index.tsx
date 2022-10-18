import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";

interface IProps {
  value: string;
  setValue: (arg: string) => void;
  max?: number;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "#000",
  backgroundColor: "rgb(255 237 213)",
  borderRadius: 1,
  textAlign: "end",
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
})) as typeof TextField;

const NumberInput = ({ value, setValue, max }: IProps) => {
  return (
    <>
      <StyledTextField

        onChange={(e) => {
          if (+e.target.value > 0) setValue(e.target.value);
        }}
        type="number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ height: "100%", cursor: "pointer" }}
              onClick={() => max && setValue(max.toFixed(10))}
            >
              {max ? (
                <Typography sx={{ color: "#78350f", fontWeight: 800 }}>
                  MAX&nbsp;&nbsp;
                </Typography>
              ) : null}
            </InputAdornment>
          ),
        }}
        value={value}
        variant="outlined"
      />
    </>
  );
};

export default NumberInput;
