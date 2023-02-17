import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import MainCard from "../Components/MainCard";

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001/raffles");

function BidStates() {
  const [amount, setAmount] = useState("");
  const [exportAmount, setExportAmount] = useState("");
  const userId = localStorage.getItem("userId");
  console.log("로컬스토리지 겟", userId);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setExportAmount(Number(amount).toLocaleString());
      socket.emit("bidding", { amount: amount, user: userId });

      // emit a socket event to the server
    }
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Stack width="100%" sx={{ mt: 1 }}>
        <Typography variant="h5">직전입찰금액</Typography>
        <MainCard id="exportAmount" sx={{ mt: 2 }}>
          ₩ {exportAmount} 원
        </MainCard>
        <Typography sx={{ mt: 2 }} variant="h5">
          입찰금액입력
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <OutlinedInput
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            startAdornment={<InputAdornment position="start">₩</InputAdornment>}
            endAdornment={<InputAdornment position="end">원</InputAdornment>}
            label="Amount"
            onKeyDown={handleKeyDown}
          />
        </FormControl>
      </Stack>
    </Box>
  );
}

export default BidStates;
