import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { logout } from "../../store"
import { useDispatch } from 'react-redux'
import { Autocomplete, CssBaseline, Divider, Drawer, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import StraightenIcon from '@mui/icons-material/Straighten';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const drawerWidth = 300;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  backgroundColor: "#fdd835a3",
  '&:hover': {
    backgroundColor: "#fdd835",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Animation = styled(Toolbar)({
  // "@keyframes rainbow": {
  //   "0%" : {
  //     backgroundPosition: "0% 50%"
  //   },
  //   "50%": {
  //     backgroundPosition: "100% 50%"
  //   },
  //   "100%": {
  //     backgroundPosition: "0% 50%"
  //   },
  // },
  // background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
  // webkitAnimation: 'rainbow 18s ease infinite',
  // MozAnimation: "rainbow 18s ease infinite",
  // OAnimation: "rainbow 18s ease infinite",
  // animation: "rainbow 18s ease infinite",
  // backgroundSize: "400% 400%",
  // background: 'transparent',
  // boxShadow: 'none',
});

export default function Navbar() {
  let state = useSelector((state) => state.users);
  // console.log(state.value.userID);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const navigate = useNavigate();
  const gotolink = (link) => {
    // window.history.pushState("", "", link);

    navigate(link);
  }

  let toLoad;

  if(state.value.email === "")
    toLoad = <div>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Login')}}>Log In</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Register')}}>Register</MenuItem>
    </div>
  else
    toLoad = <div>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Home')}}>Home</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Profile')}}>My Profile</MenuItem> 
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Images')}}>My Images</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); state = dispatch(logout())}}>Logout</MenuItem>
    </div>;

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {toLoad}
      
    </Menu>
  );

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const [options, setOptions] = React.useState([]);

  const getOptions = () => {
    axios.get("http://localhost:5000/alluser").then((res) => {
      if(res)
      {
        var temparray = [];

        for (let i = 0; i < res.data.users.length; i++) {
          temparray.push(res.data.users[i]['email']);
        }

        setOptions(temparray);
      }
    })
  }

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar sx={{ zIndex: "5" }} elevation={0} color="transparent" position="static">
        <Animation>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, color: "#fdd835" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', fontFamily: 'Brush Script MT', fontStyle: "cursive", cursor: "pointer",
            color: "#fdd835" } }}
            onClick={() => {navigate('/')}}
          >
            Fashion Fever
          </Typography>
          <Search>
            <Autocomplete disablePortal id="combo-box-demo" options={options} sx={{ width: 300 }} open={open2}
              onInputChange={(_, value) => {
                if (value.length === 0) {
                  if (open2) setOpen2(false);
                } else {
                  if (!open2) setOpen2(true);
                }
              }}
              onClose={() => setOpen2(false)} freeSolo forcePopupIcon={true} popupIcon={<SearchIcon />}
              renderInput={(params) => <TextField {...params} variant="filled" sx={{ '& label.Mui-focused': { color: 'black' } }}
              label="Search" onClick={getOptions} />}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Fab size="small" sx={{ background: "#fdd835", float: "center", fontFamily: 'Roboto', fontSize: "15px", paddingRight: "10px",
          "&:hover": { background: "#fdd835a3" } }} variant="extended" color="inherit" aria-label="add" onClick={() => {
              if(state.value.email === "")
              {
                  navigate('/Login');
              }
              else
              {
                  navigate('/Createad')
              }}}>
              <AddIcon />
              Ad
          </Fab>
          <Fab size="small" sx={{ background: "#fdd835", float: "center", fontFamily: 'Roboto', fontSize: "15px", marginLeft: "5px",
          paddingLeft: "10px", paddingRight: "10px", "&:hover": { background: "#fdd835a3" }, marginRight: "5px" }} variant="extended"
          color="inherit" aria-label="add" onClick={() => {
              if(state.value.email === "")
              {
                  navigate('/Login');
              }
              else
              {
                  navigate('/GenImage')
              }}}>
              <AddIcon />
              AI Image
          </Fab>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" sx={{ color: "#fdd835" }} >
              <Badge badgeContent={4} color="error" invisible={true}>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" sx={{ color: "#fdd835" }} >
              {/* change value of invisible and badge content for messages and notifaction numbers */}
              <Badge badgeContent={1} color="error" invisible={true}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true"
              onClick={handleProfileMenuOpen} sx={{ color: "#fdd835" }} >
              <AccountCircle />
            </IconButton>
          </Box>
        </Animation>
      </AppBar>
      {renderMenu}
      <Drawer
        sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box',
        backgroundColor: "gray" },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { float: 'flex-start', fontFamily: 'Brush Script MT', fontStyle: "cursive", cursor: "pointer",
            color: "#fdd835" } }}
            onClick={() => {navigate('/')}}
          >
            Fashion Fever
          </Typography>
          <Divider oriantation="vertical" variant="middle" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'My Images', 'My Measurements', 'My Ads'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ color: "#fdd835" }} >
                <ListItemIcon sx={{ color: "#fdd835" }} >
                  {index === 0 ? <HomeIcon /> : index === 1 ? <ImageIcon /> : index === 2 ? <StraightenIcon />: <ViewDayIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['About'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ backgroundColor: "purple", color: "#fdd835", borderRadius: "20px", margin: "5px"}} >
                <ListItemIcon sx={{ color: "#fdd835" }} >
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
