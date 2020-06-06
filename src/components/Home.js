import React, { useState } from "react";

import app from "../Base";
import Profile from "./Profile";

import { AccountCircle } from "@material-ui/icons";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";

//------

const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="primary" position="static" fullWidth>
        <Toolbar>
          <Typography variant="subtitle2" color="inherit" style={{ flex: 1 }}>
            {`CRUD APP`}
          </Typography>
          <IconButton color="inherit">
            <AccountCircle
              aria-controls="simple-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            />

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setShowProfile(true);
                  handleClose();
                }}
              >
                My account
              </MenuItem>
              <MenuItem
                onClick={() => {
                  app.auth().signOut();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </IconButton>
        </Toolbar>
      </AppBar>
      {showProfile && <Profile setShowProfile={setShowProfile} />}
    </>
  );
};

export default Home;
