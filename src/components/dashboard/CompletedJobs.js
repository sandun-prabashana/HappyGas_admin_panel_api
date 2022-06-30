import {
   Avatar,
   Box,
   Card,
   CardContent,
   Grid,
   Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";

const CompletedJobs = ({ completedJobs, ...props }) => (
   <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
         <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
               <Typography color="textSecondary" gutterBottom variant="h6">
                  Completed Orders
               </Typography>
               <Typography color="textPrimary" variant="h3">
                  {completedJobs}
               </Typography>
            </Grid>
            <Grid item>
               <Avatar
                  sx={{
                     backgroundColor: green[600],
                     height: 56,
                     width: 56,
                  }}
               >
                  <PeopleIcon />
               </Avatar>
            </Grid>
         </Grid>
      </CardContent>
   </Card>
);

export default CompletedJobs;
