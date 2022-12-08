import { AppContext } from '../providers/AppContext';
//.....................................................
import { useNavigate } from "react-router-dom"; 
import { useContext } from 'react';
import * as React from 'react';
//.....................................................
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
//.....................................................



export default function MenuAppBar() {
                  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {logoutUser} = useContext(AppContext)

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFeedClick = () => {
    navigate("/");
  };
  const handleProfileClick = () => {
    navigate("/profile");
  }

  const handleLogOut = () => {
    logoutUser()
    
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static" sx={{ bgcolor: '#3B8DBF', mb: 2 }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleFeedClick}>Feed</MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>

              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}