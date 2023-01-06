import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


export default function PairingSwitch({checked, handleChange, label}) {
  return (
    <FormGroup className='pairing-div'>
      <FormControlLabel 
        control={
          <Switch 
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }} 
          />} 
        label={label} 
      />
    </FormGroup>
  );
}
 