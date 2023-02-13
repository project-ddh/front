import * as React from "react";
import axios from "axios";
import { useParams } from "react-router";

// material-ui
import { Box, Grid, Stack, Typography } from "@mui/material";

// project import
import OrdersTable from "../Components/Orderstable";
import ApexChart from "../Components/ApexChart";
import MainCard from "../Components/MainCard";
import AnalyticEcommerce from "../Components/AnalyticEcommerce";

export default function Event() {
  const productId = useParams().productId;
  const token = localStorage.getItem("token");
  const [itemData, setItemData] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`http://localhost:3001/products/event/${productId}`, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        setItemData(response.data);
        console.log("이벤트 상세페이지 response ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Box width={"95%"} margin={"auto"} marginTop={"50px"}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Raffle Board</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="평균가격"
            count="4,42,236"
            percentage={59.3}
            extra="35,000"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="최고가격"
            count="78,250"
            percentage={70.5}
            extra="8,900"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="한달간 가격변동"
            count="18,800"
            percentage={27.4}
            isLoss
            color="warning"
            extra="1,943"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales"
            count="$35,078"
            percentage={27.4}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </Grid>

        <Grid
          item
          md={8}
          sx={{ display: { sm: "none", md: "block", lg: "none" } }}
        />

        {/* row 2 */}
        <Grid
          container
          rowSpacing={4}
          columnSpacing={2.75}
          mt={4}
          margin={"auto"}
          width={"100%"}>
          <Grid item xs={6} md={6}>
            <Typography variant="h5">Product Image</Typography>
            <MainCard
              sx={{
                width: "92%",
                height: "92%",
                mt: 2,
                overflowX: "auto",
                position: "relative",
                display: "block",
                backgroundColor: "primary.dark",
              }}>
              <img
                width={"100%"}
                src={
                  "https://revelyshop.com/data/item/1616996298/thumb-7Ji17ZmU67mo3333_800x800.jpg"
                }
              />
            </MainCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h5">입찰정보창</Typography>
            <MainCard
              sx={{
                width: "92%",
                height: "92%",
                mt: 2,
                overflowX: "auto",
                position: "relative",
                display: "block",
                backgroundColor: "primary.dark",
              }}></MainCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Recent Orders</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2, height: "92%" }} content={false}>
              <OrdersTable />
            </MainCard>
          </Grid>
        </Grid>
        {/* row 3 */}
        <Grid item xs={12} md={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Income Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2, mb: 5 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  This Week Statistics
                </Typography>
                <Typography variant="h3">$7,650</Typography>
              </Stack>
            </Box>
            <ApexChart />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
