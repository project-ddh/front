import { useState, useEffect } from "react";
import { useParams } from "react-router";

// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001/raffles");

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
  const id = useParams().raffleId;
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
          <TableBody key={id}>
            {rows
              .sort((a, b) => b.time.localeCompare(a.time))
              .slice(0, 10)
              .map((row) => {
                return (
                  <TableRow>
                    <TableCell align="left">{row.userId}</TableCell>
                    <TableCell align="center">₩ {row.Bid}</TableCell>
                    <TableCell align="right">{row.time}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
