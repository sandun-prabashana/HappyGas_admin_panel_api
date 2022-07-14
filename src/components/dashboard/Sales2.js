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

   useEffect(() => {
      var area = sessionStorage.getItem('area');
      var newdata;
      if (area == 'Colombo'){
         newdata = [54266,57697,56957,51309,46220,48992,57762,59748,55332,55118,43412,40119]
         setdataset(newdata)
         setlableset("Colombo")
      }else if(area == 'Dehiwala'){
         newdata = [ 42424, 43550, 41899, 35057, 38295, 42973, 45814, 47840, 46377, 45495, 35144, 32788]
         setdataset(newdata)
         setlableset("Dehiwala")
      }else if(area == 'Galle'){
         setlableset("Galle")
         newdata = [ 14973,
            15355,
            15640,
            14427,
            10824,
            15375,
            18472,
            19249,
            17622,
            15934,
            15596,
            14876
         ]
         setdataset(newdata)
      }else if(area == 'Gampaha'){
         setlableset("Gampaha")
         newdata = [ 11794,
            11978,
            11902,
            11558,
            11509,
            12725,
            14674,
            14790,
            15374,
            14309,
            12892,
            12002
         ]
         setdataset(newdata)
      }else if(area == 'Kandy'){
         setlableset("Kandy")
         newdata = [ 12867,
            12865,
            13357,
            12144,
            12487,
            12004,
            12962,
            12920,
            12659,
            12540,
            9981,
            8056
         ]
         setdataset(newdata)
      }else if(area == 'Kolonnawa'){
         setlableset("Kolonnawa")
         newdata = [ 10730,
            10232,
            9631,
            9702,
            7980,
            9493,
            10895,
            10922,
            10169,
            10730,
            9723,
            8689
         ]
         setdataset(newdata)
      }else if(area == 'Maharagama'){
         setlableset("Maharagama")
         newdata = [ 23668,
            25993,
            26034,
            25508,
            17405,
            25596,
            27856,
            28380,
            26401,
            27815,
            24512,
            22312
         ]
         setdataset(newdata)
      }else if(area == 'Moratuwa'){
         setlableset("Moratuwa")
         newdata = [ 26437,
            29981,
            29274,
            27867,
            21822,
            28651,
            32405,
            31860,
            29830,
            31132,
            23462,
            20987
         ]
         setdataset(newdata)
      }else if(area == 'Negambo'){
         setlableset("Negambo")
         newdata = [ 19067,
            19375,
            19393,
            17856,
            16880,
            18102,
            22147,
            21666,
            20461,
            20400,
            19063,
            18765
         ]
         setdataset(newdata)
      }
      console.log(area)
      console.log(newdata)
   }, [])

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

   let data = {
      datasets: [
         {
            backgroundColor: colors.indigo[500],
            barPercentage: 0.5,
            barThickness: 15,
            borderRadius: 4,
            categoryPercentage: 0.5,
            data: dataset,
            label: "Gas Sold Volume "+lableset+" City",
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
