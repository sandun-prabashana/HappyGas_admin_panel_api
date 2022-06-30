/*eslint-disable*/
import moment from "moment";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
   Box,
   Button,
   Card,
   CardHeader,
   Chip,
   Divider,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React, { useState, useEffect } from "react";
import DashBoardService from "src/service/DashBoardService";
import { useNavigate } from "react-router-dom";

const LatestOrders = (props) => {
   const [orders, setOrders] = useState([]);
   const dashboardService = new DashBoardService();

  //  useEffect(async () => {
  //     const data = await dashboardService.getLatestJobsRequests();
  //     console.log(data);
  //     setOrders(data.data);
  //  }, []);
  //  console.log("orders" + orders);
   const navigate = useNavigate();

   return (
      <Card {...props}>
         <CardHeader title="All Jobs" />
         <Divider />
         <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Job ID</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Delivery Fee (AUD)</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Pickup Address</TableCell>
                        <TableCell>Dropoff Address</TableCell>
                        <TableCell>Status</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {orders.map((order) => (
                        <TableRow hover key={order.id}>
                           <TableCell>{order?.id}</TableCell>
                           <TableCell>
                              {order?.customer?.customerName}
                           </TableCell>
                           <TableCell>{order?.deliveryFee}</TableCell>
                           <TableCell>
                              {moment(order.createdAt).format("DD/MM/YYYY")}
                           </TableCell>
                           <TableCell>{order?.pickupAddress}</TableCell>
                           <TableCell>{order?.dropOffAddress}</TableCell>
                           <TableCell>
                              <Chip
                                 color="primary"
                                 label={order.status.replaceAll("_", " ")}
                                 size="small"
                              />
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </Box>
         </PerfectScrollbar>
         <Box
            sx={{
               display: "flex",
               justifyContent: "flex-end",
               p: 2,
            }}
         >
            <Button
               color="primary"
               endIcon={<ArrowRightIcon />}
               size="small"
               variant="text"
               onClick={() => {
                  navigate("all/requests");
               }}
            >
               View all
            </Button>
         </Box>
      </Card>
   );
};
export default LatestOrders;
