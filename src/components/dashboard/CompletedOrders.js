import {
   Avatar,
   Box,
   Card,
   CardContent,
   Grid,
   Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import PeopleIcon from "@material-ui/icons/PeopleOutlined";

const CompletedOrders = ({ CompletedOrders, ...props }) => (
    <Card sx={{ height: "100%" }} {...props}>
       <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
             <Grid item>
                <Typography color="textSecondary" gutterBottom variant="h6">
                   Completed Orders
                </Typography>
                <Typography color="textPrimary" variant="h3">
                   {CompletedOrders}
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

export default CompletedOrders;
