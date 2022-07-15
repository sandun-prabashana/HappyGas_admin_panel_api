/*eslint-disable*/

import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import TodayOrders from "../components/dashboard/TodayOrders";
// import LatestOrders from "../components/dashboard/LatestOrders";
import Sales from "../components/dashboard/Sales";
import PendingOrders from "../components/dashboard/PendingOrders";
import CompletedOrders from "../components/dashboard/CompletedOrders";
import TotalProfit from "../components/dashboard/TotalProfit";
import JobStatusChart from "../components/dashboard/JobStatusChart";

import React, { useState, useEffect } from "react";
import axios from 'axios'


const api = axios.create({
})

function Dashboard() {

   const [dashboard, setDashboard] = useState({
      totalIncome: "",
      pendingJobPercentage: "",
      Orders: '',
      CompletedOrders: '',
      totalJobs: 0,
      allocatedJobs: 0,
      notAllocatedJobs: 0,
      weeklyReport: [],
   });

   const [jobList, setJobList] = useState([]);

   //    useEffect(async () => {
   //       const data = await dashboardService.getDashBoardData();
   //       setDashboard(data.data);
   //    }, []);
   //    console.log(dashboard);

   useEffect(() => {
      api.get("https://happygas.herokuapp.com/api/v1/adminRoute/getAllproductStatus")
          .then(res => {
             console.log(res.data.order.orderCount)
              let tot = res.data.order.orderCount
              let com = res.data.complete.completeOrder


              setDashboard({
                  ...dashboard,
                  Orders: res.data.order.orderCount,
                  CompletedOrders:res.data.complete.completeOrder,
                  pendingJobPercentage:(com/tot)*100,
                  totalIncome:res.data.complete.completeOrder*5000

              });
          })
          .catch(error=>{
             console.log("Error")
          })
   }, [])

   return (
      <>

         <Helmet>
            <title>Dashboard | Material Kit</title>
         </Helmet>
         <Box
            sx={{
               backgroundColor: "background.default",
               minHeight: "100%",
               py: 3,
            }}
         >
            <Container maxWidth={false}>
               <Grid container spacing={3}>
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                     <TodayOrders ongoingJobs={dashboard.Orders} />
                  </Grid>
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                     <CompletedOrders CompletedOrders={dashboard.CompletedOrders} />
                  </Grid>
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                     <PendingOrders
                         pendingOrderPercentage={dashboard.pendingJobPercentage}
                     />
                  </Grid>
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                     <TotalProfit
                        totalIncome={dashboard.totalIncome}
                        sx={{ height: "100%" }}
                     />
                  </Grid>
                  <Grid item lg={12} md={12} xl={12} xs={12}>
                     <Sales weeklyReport={dashboard.weeklyReport} />
                  </Grid>
                  {/* <Grid item lg={4} md={6} xl={3} xs={12}>
                     <JobStatusChart
                        totalJobs={dashboard.totalJobs}
                        allocatedJobs={dashboard.allocatedJobs}
                        notAllocatedJobs={dashboard.notAllocatedJobs}
                        sx={{ height: "100%" }}
                     />
                  </Grid> */}
                  {/* <Grid item lg={12} md={12} xl={12} xs={12}>
                     <LatestOrders />
                  </Grid> */}
               </Grid>
            </Container>
         </Box>
      </>
   );
}
export default Dashboard;
