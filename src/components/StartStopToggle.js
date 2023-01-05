import React from 'react';
import Button from '@mui/material/Button';


export default function StartStopToggle({title, color, disabled, handleChange}) {
    return (
        <Button
        variant='contained'
        onClick={handleChange}
        disabled={disabled}
        color={color}
        >{title}
        </Button>
    );
}
