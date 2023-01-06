import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Battery50Icon from '@mui/icons-material/Battery50';

export default function FolderList({battery, range, odometer}) {
  return (
    <List className='info-container-bg' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <ListItem>
        <ListItemText primary={battery} secondary="Battery Level" />
      </ListItem>
      <ListItem>
        <ListItemText primary={range} secondary="Estimated Range" />
      </ListItem>
      <ListItem>
        <ListItemText primary={odometer} secondary="Odometer" />
      </ListItem>
    </List>
  );
}