import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(userId, Bid, time) {
  return { userId, Bid, time };
}

const rows = [
  createData("user1", "49,000", "10:13:24"),
  createData("user2", "44,000", "10:13:15"),
  createData("user3", "50,000", "10:13:56"),
  createData("user5", "40,000", "10:13:12"),
  createData("user6", "38,000", "10:13:03"),
  createData("user1000", "45,000", "10:13:22"),
  createData("user10000", "60,000", "10:14:02"),
  createData("user1231414", "37,000", "10:13:00"),
  createData("user314", "61,000", "10:14:12"),
  createData("user56756", "70,000", "10:15:01"),
];

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
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: "userId",
    align: "left",
    disablePadding: false,
    label: "입찰자 ID",
  },
  {
    id: "Bid",
    align: "left",
    disablePadding: true,
    label: "입찰금액(₩)",
  },
  {
    id: "time",
    align: "left",
    disablePadding: false,
    label: "Time",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState("desc");
  const [orderBy] = useState("time");

  return (
    <Box>
      <TableContainer
        sx={{
          overflowX: "auto",
          position: "relative",
          display: "block",
          "& td, & th": { whiteSpace: "nowrap" },
        }}>
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row) => {
              return (
                <TableRow key={row.userId}>
                  <TableCell align="left">{row.userId}</TableCell>
                  <TableCell align="left">₩ {row.Bid}</TableCell>
                  <TableCell align="left">{row.time}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
