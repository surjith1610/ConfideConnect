import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import {useTranslation} from 'react-i18next';


const SubNavBar = ({ items, handleTabChange, tabIndex }) => {

  const { t } = useTranslation('common');

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {items.map((item, index) => (
          <Tab key={index} label={t(item)} />
        ))}
      </Tabs>
    </Box>
  );
};

export default SubNavBar;