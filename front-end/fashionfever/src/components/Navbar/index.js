import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { logout } from "../../store"
import { useDispatch } from 'react-redux'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const Animation = styled(Toolbar)({
  "@keyframes rainbow": {
    "0%" : {
      backgroundPosition: "0% 50%"
    },
    "50%": {
      backgroundPosition: "100% 50%"
    },
    "100%": {
      backgroundPosition: "0% 50%"
    },
  },
  background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
  webkitAnimation: 'rainbow 18s ease infinite',
  MozAnimation: "rainbow 18s ease infinite",
  OAnimation: "rainbow 18s ease infinite",
  animation: "rainbow 18s ease infinite",
  backgroundSize: "400% 400%",
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
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Profile')}}>My Profile</MenuItem> 
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/')}}>My Images</MenuItem>
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
      <MenuItem onClick={() => {handleMenuClose(); gotolink('/Home')}}>Home</MenuItem>
      {toLoad}
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Animation>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block', fontFamily: 'Brush Script MT', fontStyle: "cursive", cursor: "pointer" } }}
              onClick={() => {navigate('/')}}
            >
              Fashion Fever
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error" invisible={true}>
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={1} color="error" invisible={false}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Animation>
        </AppBar>
      {renderMenu}
    </Box>
  );
}
