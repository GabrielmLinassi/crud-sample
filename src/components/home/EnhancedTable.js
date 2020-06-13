import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  makeStyles,
  FormControlLabel,
  Switch,
  Checkbox,
  TablePagination,
} from "@material-ui/core";

import EnhancedTableHead from "./enhancedTable/EnhancedTableHead";
import EnhancedTableToolbar from "./enhancedTable/EnhancedTableToolbar";

//--
function createData(project, customer, status) {
  return { project, customer, status };
}

const rows = [
  createData("Build a house", "Gabriel Linassi", "On Progress"),
  createData("Architect apartment", "Juliana Sponchiado", "Pending"),
  createData("Build a new bathroom", "Carmen Marmitt", "Done"),
  createData("Architect a garden", "Rose Smith", "Done"),
  createData("Clean building", "Joseph Stalin", "On Progress"),
  createData("Go to supermarket", "Elias Hunemberg", "Pending"),
];
//--

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: `${theme.spacing(3)}px 0`,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: "750px",
  },
}));

const EnhancedTable = () => {
  const classes = useStyles();

  const [dense, setDense] = useState(false);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("status");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isSelected = (project) => selected.indexOf(project) !== -1;

  // handlers
  const handleClick = (project) => {
    const selectedIndex = selected.indexOf(project);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, project);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.project);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleRequestSort(event, id) {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //end handlers

  // Sorting
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  //--

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <EnhancedTableToolbar numSelected={selected.length} />
          <Table className={classes.table} size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              rowCount={rows.length}
              orderBy={orderBy}
              order={order}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.project);
                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex="-1"
                      selected={isItemSelected}
                      onClick={() => handleClick(row.project)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell>{row.project}</TableCell>
                      <TableCell>{row.customer}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* paggination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        ></TablePagination>
      </Paper>
      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={() => setDense((prevState) => !prevState)}
            name="dense"
            color="primary"
          />
        }
        label="Dense padding"
      />
    </div>
  );
};

export default EnhancedTable;
