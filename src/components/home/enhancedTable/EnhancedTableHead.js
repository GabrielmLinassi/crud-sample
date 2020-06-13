import React from "react";

import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
} from "@material-ui/core";

const headCells = [
  {
    id: "project",
    numeric: "false",
    disablePadding: "false",
    label: "Project",
  },
  {
    id: "customer",
    numeric: "false",
    disablePadding: "false",
    label: "Customer",
  },
  {
    id: "status",
    numeric: "false",
    disablePadding: "false",
    label: "Status",
  },
];

const EnhancedTableHead = ({
  numSelected,
  rowCount,
  onSelectAllClick,
  orderBy,
  order,
  onRequestSort,
}) => {
  const createSortHandler = (id) => (event) => onRequestSort(event, id);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : "asc"}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
