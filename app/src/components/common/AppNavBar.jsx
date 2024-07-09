import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip, Select, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';

import { clearUser } from "../../store/slices/user-slice";
import ribbonIcon from '../../assets/images/ribbon7.png'; 


const AppNavbar = () => {

  // state variables
  const { t , i18n} = useTranslation('common');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.user.accessToken);
  const user = useSelector((state) => state.user.user);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    dispatch(clearUser());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user')
    navigate('/home');
  };

  const isActiveRoute = (route) => {
    return location.pathname === route;
  }
  
  // set the selected language based on the current language
  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <AppBar position="sticky" color="primary" sx={{ backgroundColor: 'black'}}>
      <Toolbar>
        {!isActiveRoute('/home') ? (
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer'  }} 
              onClick={handleHomeClick}>
            <img
              src={ribbonIcon}
              alt="AIDS Ribbon"
              style={{
                maxWidth: '35px',
                maxHeight: '35px',
              }}
            />
          </Box>
        ) : null}
        <Box sx={{ flexGrow: 1 }} />
        {user ? (
          <Button color="inherit" onClick={() => navigate(`/${user.role}`)}
            variant={isActiveRoute(`/${user.role}`) ? "contained" : "text"}
            sx={{ mr: 1 }}>
            {t('my_dashboard')}
          </Button>
        ) : null}
        <Button color="inherit" onClick={() => navigate('/events')}
          variant={isActiveRoute('/events') ? "contained" : "text"}
          sx={{ mr: 1 }}>
          {t('events')}
        </Button>
        <Button color="inherit" onClick={() => navigate('/blogs')}
          variant={isActiveRoute('/blogs') ? "contained" : "text"}
          sx={{ mr: 1 }}>
          {t('blogs')}
        </Button>
        <Button color="inherit" onClick={() => navigate('/donations')}
          variant={isActiveRoute('/donations') ? "contained" : "text"}
          sx={{ mr: 1 }}>
          {t('donate')}
        </Button>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ta">தமிழ்</MenuItem>
          <MenuItem value="ma">മലയാളം</MenuItem>
          <MenuItem value="te">తెలుగు</MenuItem>
        </Select>
        {isAuthenticated ? (
          <Tooltip title="Logout" placement="bottom">
            <IconButton color="inherit" onClick={handleLogoutClick}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Login" placement="bottom">
            <IconButton color="inherit" onClick={handleLoginClick}>
              <LoginIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;