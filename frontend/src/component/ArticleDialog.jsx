import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import getURL from "../utils/getURL";

export default function ArticleDialog({ open, data, handleClose }) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {data?.title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          id="customized-dialog-title"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ minWidth: { xs: 200, md: 500 } }}>
        <Box
          component="img"
          sx={{ height: 250, width: "100%" }}
          src={getURL(data?.picture)}
          alt="random"
        />
        <Typography gutterBottom>{data?.description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
