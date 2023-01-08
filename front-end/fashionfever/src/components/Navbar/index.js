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
import { Autocomplete, CssBaseline, Divider, Drawer, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import StraightenIcon from '@mui/icons-material/Straighten';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { ChatItem } from 'react-chat-elements';

const drawerWidth = 300;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
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

const Animation = styled(Toolbar)({});

export default function Navbar() {
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
    navigate(link);
  }

  let toLoad;

  if(localStorage.getItem("email") === "")
    toLoad = <div>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Login')}}>Log In</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Register')}}>Register</MenuItem>
    </div>
  else
    toLoad = <div>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Home')}}>Home</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Profile')}}>My Profile</MenuItem> 
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Images')}}>My Images</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Measurements')}}>My Measurements</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); localStorage.setItem("email", "")}}>Logout</MenuItem>
    </div>;

  const [convo, setConvo] = React.useState([]);
  React.useEffect(() => {
    let temp = {
        email: localStorage.getItem('email'),
    }
    let json = JSON.stringify(temp);
    let heads = {"Content-Type": "application/json"};
    axios.post('http://localhost:5001/getconversations', json, { headers: heads }).then((res) => {
      if(res.data)
      {
        console.log(res.data.conversation);
        setConvo(res.data.conversations);
      }
    });
  }, [])

  let toLoad2;

  if(localStorage.getItem("email") === "")
    toLoad2 = <div>
      <MenuItem onClick={() => {handleMenuClose2(); gotolink('/Login')}}>Log In</MenuItem>
      <MenuItem onClick={() => {handleMenuClose2(); gotolink('/Register')}}>Register</MenuItem>
    </div>
  else
  {
    toLoad2 = <div>
      {convo.map((item, i) => (
          <MenuItem key={i} onClick={() => {handleMenuClose2(); navigate('/Chat', { state: { otherguy: item.name,
            key: item.conversation } })}}>
            <ChatItem
              avatar={item.profile}
              alt={'Reactjs'}
              title={item.name}
              subtitle={ item.messages[item.conversation] ? item.messages[item.conversation].message : "You have a new message!" }
              unread={0}
            />
          </MenuItem>
      ))}
    </div>;
  }

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

  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const isMenuOpen2 = Boolean(anchorEl2);

  const handleProfileMenuOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  const menuId2 = 'primary-search-account-menu2';
  const renderMessages = (
    <Menu
      anchorEl={anchorEl2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId2}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen2}
      onClose={handleMenuClose2}
    >
      {convo.length === 0 ? <MenuItem>Loading</MenuItem> : toLoad2}
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
  const [allData, setAllData] = React.useState([]);

  const getOptions = () => {
    axios.get("http://localhost:5000/alluser").then((res) => {
      if(res)
      {
        var temparray = [];

        for (let i = 0; i < res.data.users.length; i++) {
          temparray.push(res.data.users[i]['email']);
        }

        setOptions(temparray);
        setAllData(res.data.users);
      }
    })
  }

  let oldValue = "";

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
              }} onChange={(event, newValue) => {
                  let ind = options.indexOf(newValue);
                  if ( ind !== -1 ) {
                    if(window.location.pathname === "/ViewProfile") {
                      navigate(0, { state: { first_name: allData[ind].first_name, last_name: allData[ind].last_name, 
                        email: allData[ind].email, bio: allData[ind].bio, phone_number: allData[ind].phone_number } })
                    } 
                    navigate('/ViewProfile', { state: { first_name: allData[ind].first_name, last_name: allData[ind].last_name, 
                      email: allData[ind].email, bio: allData[ind].bio, phone_number: allData[ind].phone_number } });
                  } }}
              onClose={() => setOpen2(false)} freeSolo forcePopupIcon={true} popupIcon={<SearchIcon />}
              renderInput={(params) => <TextField {...params} variant="filled" sx={{ '& label.Mui-focused': { color: 'black' },
              "& .MuiFilledInput-underline:after": { borderBottomColor: "black" } }}
              label="Search" onClick={getOptions} />}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Fab size="small" sx={{ background: "#fdd835", float: "center", fontFamily: 'Roboto', fontSize: "15px", paddingRight: "10px",
            "&:hover": { background: "#fdd835a3" } }} variant="extended" color="inherit" aria-label="add" onClick={() => {
            if(localStorage.getItem("email") === "" || localStorage.getItem("email") === null)
            {
              navigate('/Login');
            }
            else
            {
              navigate('/Createad');
            }}}>
            <AddIcon />
            Ad
          </Fab>
          <Fab size="small" sx={{ background: "#fdd835", float: "center", fontFamily: 'Roboto', fontSize: "15px", marginLeft: "5px",
            paddingLeft: "10px", paddingRight: "10px", "&:hover": { background: "#fdd835a3" }, marginRight: "5px" }} variant="extended"
            color="inherit" aria-label="add" onClick={() => {
            if(localStorage.getItem("email") === "" || localStorage.getItem("email") === null)
            {
              navigate('/Login');
            }
            else
            {
              navigate('/GenImage');
            }}}>
            <AddIcon />
            AI Image
          </Fab>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" sx={{ color: "#fdd835" }} onClick={handleProfileMenuOpen2} >
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
      {renderMessages}
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
