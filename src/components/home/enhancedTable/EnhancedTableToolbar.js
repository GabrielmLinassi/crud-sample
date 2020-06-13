import React from "react";

import clsx from "clsx";

import { Delete } from "@material-ui/icons";

import {
  makeStyles,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  lighten,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.dark, 0.85),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({ numSelected }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Projects
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
