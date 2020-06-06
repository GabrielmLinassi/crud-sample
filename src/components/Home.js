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
  makeStyles,
} from "@material-ui/core";

//------

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="fixed" fullWidth>
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
    </div>
  );
};

export default Home;
