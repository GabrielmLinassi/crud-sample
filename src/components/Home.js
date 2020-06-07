import React, { useState } from "react";

import app from "../Base";
import Profile from "./Profile";

import { AccountCircle } from "@material-ui/icons";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

//------

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    minHeight: "100vh",
  },
  lastChild: {
    marginBottom: "15px",
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
      <AppBar color="primary" position="sticky" fullWidth>
        <Toolbar>
          <Typography variant="subtitle2" color="inherit" style={{ flex: 1 }}>
            <Button
              color="inherit"
              onClick={() => {
                setShowProfile(false);
              }}
            >
              CRUD APP
            </Button>
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
                  setShowProfile(!showProfile);
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
      <div className={classes.lastChild}>
        {showProfile && <Profile setShowProfile={setShowProfile} />}
      </div>
    </div>
  );
};

export default Home;
