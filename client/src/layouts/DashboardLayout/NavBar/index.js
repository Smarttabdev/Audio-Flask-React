import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  // AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  // Settings as SettingsIcon,
  // ShoppingBag as ShoppingBagIcon,
  // User as UserIcon,
  UserPlus as UserPlusIcon,
  // Users as UsersIcon
} from 'react-feather';
import InputIcon from '@material-ui/icons/Input';
import { userActions } from 'src/actions';
import NavItem from './NavItem';

// const user = {
//   avatar: '/static/images/avatars/user.png',
//   jobTitle: 'Artist',
//   name: 'Katarina Smith'
// };

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  // {
  //   href: '/app/customers',
  //   icon: UsersIcon,
  //   title: 'Customers'
  // },
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // }
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector(state => state.authentication.user?.userInfo);
  const isLoggedIn = useSelector(state => state.authentication.loggedIn);

  const logout = (e) => {
    e.preventDefault();
    dispatch(userActions.logout());
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      {
        isLoggedIn && (
          <>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              p={2}
            >
              <Avatar
                className={classes.avatar}
                component={RouterLink}
                // src={user.avatar}
                src="/static/images/avatars/user.png"
                to="/"
              />
              <Typography
                className={classes.name}
                color="textPrimary"
                variant="h5"
              >
                {`${user?.first_name} ${user?.last_name}`}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {user?.jobTitle || 'Artist'}
              </Typography>
            </Box>
            <Divider />
          </>
        )
      }
      <Box p={2}>
        <List>
          {items.map((item) => {
            if (isLoggedIn && item.title === "Login") {
              return (
                <NavItem
                  href={item.href}
                  key="Logout"
                  title="Logout"
                  icon={InputIcon}
                  onClick={logout}
                />
              )
            }
            return (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            )
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
