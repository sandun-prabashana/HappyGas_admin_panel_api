import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  useTheme
} from '@material-ui/core';

const JobStatusChart = ({totalJobs,allocatedJobs,notAllocatedJobs,...props}) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [totalJobs, allocatedJobs, notAllocatedJobs],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Total Jobs', 'Allocated', 'Not Allocated']
  };

  const options = {
    animation: false,
    cutoutPercentage: 70,
    layout: { padding: 0 },
    legend: {
      display: true,
      position: 'bottom',
      fullSize: true,
      align: 'center'
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader title="Job Status" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobStatusChart;
