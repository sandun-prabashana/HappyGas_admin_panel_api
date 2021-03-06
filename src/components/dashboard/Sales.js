import { Bar } from "react-chartjs-2";
import {
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   Divider,
   useTheme,
   colors,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React, { useState, useEffect } from "react";

const Sales = ({ weeklyReport, ...props }) => {
   console.log("weekly report " + weeklyReport);
   const theme = useTheme();
   const [dataset, setdataset] = useState([]);
   const [lableset, setlableset] = useState([]);

   // useEffect(() => {
   //   setdataset(weeklyReport?.data);
   //   setlableset(weeklyReport?.label);
   //   console.log(dataset);
   //   console.log(lableset);
   // }, [weeklyReport])

   // const data = {
   //   datasets: [
   //     {
   //       backgroundColor: colors.indigo[500],
   //       data: dataset,
   //       label: 'This year'
   //     }
   //   ],
   //   labels: lableset
   // };

   const data = {
      datasets: [
         {
            backgroundColor: colors.indigo[500],
            barPercentage: 0.5,
            barThickness: 15,
            borderRadius: 4,
            categoryPercentage: 0.5,
            data: [  216226, 227026, 224087,   205428,   183422,   213911,   242987, 247375, 234225, 233473, 193785, 178594,174065],
            label: "Gas Sold Volume",
            maxBarThickness: 10,
         },
      ],
      labels: ["2010", "2011", "2012", "2013", "2014", "2015","2016","2017","2018","2019","2020","2021","2022"],
   };

   const options = {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
         xAxes: [
            {
               barThickness: 12,
               maxBarThickness: 10,
               barPercentage: 0.5,
               categoryPercentage: 0.5,
               ticks: {
                  fontColor: theme.palette.text.secondary,
               },
               gridLines: {
                  display: false,
                  drawBorder: false,
               },
            },
         ],
         yAxes: [
            {
               ticks: {
                  fontColor: theme.palette.text.secondary,
                  beginAtZero: true,
                  min: 0,
               },
               gridLines: {
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: theme.palette.divider,
                  drawBorder: false,
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                  zeroLineColor: theme.palette.divider,
               },
            },
         ],
      },
      tooltips: {
         backgroundColor: theme.palette.background.paper,
         bodyFontColor: theme.palette.text.secondary,
         borderColor: theme.palette.divider,
         borderWidth: 1,
         enabled: true,
         footerFontColor: theme.palette.text.secondary,
         intersect: false,
         mode: "index",
         titleFontColor: theme.palette.text.primary,
      },
   };

   return (
      <Card {...props}>
         <CardHeader

            title="Gas Sold Records"
         />
         <Divider />
         <CardContent>
            <Box
               sx={{
                  height: 400,
                  position: "relative",
               }}
            >
               <Bar data={data} options={options} />
            </Box>
         </CardContent>
      </Card>
   );
};

export default Sales;
