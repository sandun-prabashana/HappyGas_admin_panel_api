import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Plus as PlusIcon,
  Bookmark as BookmarkIcon,
  ShoppingCart as ShoppingCartIcon
} from "react-feather";
import NavItem from "./NavItem";

const user = {
  avatar: "/static/images/avatars/Happylogo.png",
  jobTitle: "Super Admin",
  name: "Sandun Prabashana",
};



const adminNavItems = [
  {
    href: "/admin/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/admin/product",
    icon: ShoppingBagIcon,
    title: "Products",
  },
  {
    href: "/admin/customer",
    icon: UsersIcon,
    title: "Customer",
  },
  {
    href: "/admin/seller",
    icon: UserIcon,
    title: "Sellers",
  },
  {
    href: "/admin/distribute",
    icon: PlusIcon,
    title: "Distribute",
  },
  {
    href: "/admin/record",
    icon: BookmarkIcon,
    title: "Record",
  },
];
const sellerNavItems = [
  {
    href: "/seller/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/seller/pickuporders",
    icon: ShoppingCartIcon,
    title: "Pick Up Orders",
  },
  {
    href: "/seller/deliveryorders",
    icon: ShoppingBagIcon,
    title: "Delivery Orders",
  },
  {
    href: "/app/account",
    icon: UserIcon,
    title: "selller",
  },
];

const DashboardSidebar = ({ userType, onMobileClose, openMobile }) => {
  const location = useLocation();

  const [data, setData] = React.useState({
    name: '',
    type: '',
  });

  useEffect(() => {
    let name = sessionStorage.getItem('fullName')
    let userType = sessionStorage.getItem('userType')
    setData({
      ...data,
      name: name,
      type: userType
    });
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  function getNavList(item) {
    return (
      <NavItem
        href={item.href}
        key={item.title}
        title={item.title}
        icon={item.icon}
      />
    );
  }

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {data.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {data.type}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {userType === "ADMIN"
            ? adminNavItems.map((item) => getNavList(item))
            : sellerNavItems.map((item) => getNavList(item))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
