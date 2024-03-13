import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function Temp() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Toolbar>
      </AppBar>
    </Box>
  );
}
