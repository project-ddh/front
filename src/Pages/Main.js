import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
export default function Main() {
  const [itemData, setItemData] = useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:3001/raffles")
      .then(function (response) {
        setItemData(response.data.data);
        console.log("main Axios response Data", response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 6,
            pb: 2,
          }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom>
              Main Page
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="95%">
          <Grid container spacing={2}>
            {itemData
              .filter((item) => !item.isClosed)
              .map((item) => (
                <Grid item key={item.raffleId} md={2}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    <CardMedia
                      component="img"
                      image={item.product.productImage}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5">
                        {item.product.productName}
                      </Typography>
                      <Typography>
                        {`상품사이즈 : ${item.product.productSize}`}
                      </Typography>
                      <Typography>
                        {`상품정발가격 : ${item.product.releasePrice}`}
                      </Typography>
                      <Typography>
                        {`입찰시작일 : ${item.dateStart}`}
                      </Typography>
                      <Typography>{`입찰종료일 : ${item.dateEnd}`}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          navigate(`/event/${item.raffleId}`);
                        }}>
                        입찰참여
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
