import PropTypes from "prop-types";
import { useState, useEffect } from "react";

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
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001/raffles");

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
    align: "center",
    disablePadding: false,
    label: "입찰자 ID",
  },
  {
    id: "Bid",
    align: "center",
    disablePadding: true,
    label: "입찰금액(₩)",
  },
  {
    id: "time",
    align: "center",
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
function createData(userId, Bid, time) {
  const formattedTime = formatTimestamp(time);
  return { userId, Bid, time: formattedTime };
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const timeString = date.toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${dateString} ${timeString}`;
}

export default function OrderTable() {
  const [order] = useState("desc");
  const [orderBy] = useState("time");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    socket.on("bidList", (data) => {
      const newRow = createData(data.data.user, data.data.amount, data.time);
      setRows((prevState) => [...prevState, newRow]);
    });

    return () => {
      socket.off("bidList");
    };
  }, []);
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
            {stableSort(rows, getComparator(order, orderBy))
              .slice(0, 10)
              .map((row) => {
                return (
                  <TableRow key={row.userId}>
                    <TableCell align="left">{row.userId}</TableCell>
                    <TableCell align="center">₩ {row.Bid}</TableCell>
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
