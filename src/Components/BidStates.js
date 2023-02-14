import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Stack } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import MainCard from "../Components/MainCard";

function BidStates() {
  const [amount, setAmount] = useState("");
  const [exportAmount, setExportAmount] = useState("");

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Stack width="100%" sx={{ mt: 1 }}>
        <Typography variant="h5">직전 입찰금액</Typography>
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setExportAmount(Number(amount).toLocaleString());
              }
            }}
          />
        </FormControl>
      </Stack>
    </Box>
  );
}

export default BidStates;
