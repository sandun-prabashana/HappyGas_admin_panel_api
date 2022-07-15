/*eslint-disable*/

import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import TodayOrders from "../components/dashboard/TodayOrders";
// import LatestOrders from "../components/dashboard/LatestOrders";
import Sales2 from "../components/dashboard/Sales2";
import PendingOrders from "../components/dashboard/PendingOrders";
import CompletedOrders from "../components/dashboard/CompletedOrders";
import GasQuantity from "../components/dashboard/GasQuantity";
import JobStatusChart from "../components/dashboard/JobStatusChart";

import React, { useState, useEffect } from "react";
import axios from 'axios'


const api = axios.create({
})

function Dashboard2() {

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



    useEffect(() => {
        api.post("https://happygas.herokuapp.com/api/v1/adminRoute/getAllOrderDetailForSeller",{

            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    city: sessionStorage.getItem('area'),
                    nic: sessionStorage.getItem('id'),
                }
            }
        )
            .then(res => {
                console.log("all",res.data.order.AllOrders)
                console.log("complete",res.data.complete.CompletedOrders)
                console.log("gas",res.data.gas.GasQty)
                sessionStorage.setItem('gasqty', res.data.gas.GasQty)
                let tot = res.data.order.AllOrders
                let com = res.data.complete.CompletedOrders


                setDashboard({
                    ...dashboard,
                    Orders: res.data.order.AllOrders,
                    CompletedOrders:res.data.complete.CompletedOrders,
                    pendingJobPercentage:(com/tot)*100,
                    totalIncome:res.data.gas.GasQty

                });
                console.log("hello",dashboard.Orders)
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
                            <GasQuantity
                                totalIncome={dashboard.totalIncome}
                                sx={{ height: "100%" }}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} xl={12} xs={12}>
                            <Sales2 weeklyReport={dashboard.weeklyReport} />
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
export default Dashboard2;
