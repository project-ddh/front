import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

// material-ui
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Image } from "mui-image";

// project import
import OrdersTable from "../Components/Orderstable";
import ApexChart from "../Components/ApexChart";
import MainCard from "../Components/MainCard";
import AnalyticEcommerce from "../Components/AnalyticEcommerce";
import { setEvent } from "../redux/EventSlice";
import BidStates from "../Components/BidStates";

export default function Event() {
  const id = useParams().raffleId;
  const token = localStorage.getItem("token");
  const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch();
  const fetchItemData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/raffles/${id}`, {
        headers: { Authorization: token },
      });
      setItemData(response.data.data);
      dispatch(setEvent(response.data.raffleHistory));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItemData();
  }, []);
  return (
    <Box width={"1300px"} margin={"auto"} marginTop={"50px"}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">경매번호 {itemData.raffleId}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="종료일" count={itemData.dateEnd} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="상품명"
            count={itemData.product?.productName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="상품 모델"
            count={itemData.product?.productModel}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="발매가"
            count={`${Number(
              itemData.product?.releasePrice
            ).toLocaleString()} 원`}
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
          <Grid item xs={1} md={5}>
            <Typography variant="h5">상품 이미지</Typography>
            <MainCard
              sx={{
                width: "100%",
                height: "91%",
                mt: 2,
                overflowX: "auto",
                position: "relative",
                display: "block",
                backgroundColor: "primary.dark",
              }}>
              <Image
                display={"flex"}
                width={"100%"}
                src={itemData.product?.productImage}
                alt="product image"
              />
            </MainCard>
          </Grid>
          <Grid item xs={2} md={3}>
            <Typography variant="h5">입찰정보창</Typography>
            <MainCard
              sx={{
                width: "92%",
                height: "50%",
                mt: 2,
              }}>
              <BidStates />
            </MainCard>
            <MainCard
              sx={{
                width: "92%",
                height: "47%",
                mt: 2,
              }}></MainCard>
          </Grid>
          <Grid item xs={3} md={4}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">
                  실시간 입찰현황 [최대 10개]
                </Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2, height: "100%" }} content={false}>
              <OrdersTable />
            </MainCard>
          </Grid>
          <Grid item xs={4} md={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">상품 거래가격 변동 그래프</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2, mb: 5 }} content={false}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Stack spacing={2}></Stack>
              </Box>
              <ApexChart />
            </MainCard>
          </Grid>
        </Grid>
        {/* row 3 */}
      </Grid>
    </Box>
  );
}
