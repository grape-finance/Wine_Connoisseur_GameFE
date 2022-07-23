import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        color: "primary.light",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface IProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
  skillDefinition: string;
  upgradeSkillPoint: () => void;
}

export default function SkillDialog({
  open,
  setOpen,
  skillDefinition,
  upgradeSkillPoint,
}: IProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            background:
            "linear-gradient(to bottom,rgb(00 00 00/0.7),rgb(00 00 00/0.7),rgb(00 00 00/0.7))",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography color="primary.light" variant="h3" component="p">
            Upgrade Skills
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography color="primary.light" variant="h4" component="p">
            {skillDefinition}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Stack direction={"row"} spacing={2} justifyContent="space-between">
            <Button
              onClick={() => {
                upgradeSkillPoint();
                setOpen(false);
              }}
              sx={{
                width: "100%",
                borderRadius: "1rem",
                transition: "0.3s",
                textTransform: "none",
                fontSize: "16px",
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
            >
              Upgrade
            </Button>
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
