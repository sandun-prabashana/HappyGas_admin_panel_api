/*eslint-disable*/
import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import TodayJobs from "../components/dashboard/TodayJobs";
// import LatestOrders from "../components/dashboard/LatestOrders";
import Sales from "../components/dashboard/Sales";
import PendingJobs from "../components/dashboard/PendingJobs";
import CompletedJobs from "../components/dashboard/CompletedJobs";
import TotalProfit from "../components/dashboard/TotalProfit";
import JobStatusChart from "../components/dashboard/JobStatusChart";

import React, { useState, useEffect } from "react";

export default function Dashboard() {
   const [dashboard, setDashboard] = useState({
      totalIncome: "2320000",
      pendingJobPercentage: "50",
      ongoingJobs: 23000,
      completedJobs: 123123,
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
                     <TodayJobs ongoingJobs={dashboard.ongoingJobs} />
                  </Grid>
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                     <CompletedJobs completedJobs={dashboard.completedJobs} />
                  </Grid>
                  <Grid item lg={3} sm={6} xl={3} xs={12}>
                     <PendingJobs
                        pendingJobPercentage={dashboard.pendingJobPercentage}
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
