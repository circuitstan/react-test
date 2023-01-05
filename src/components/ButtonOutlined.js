import React from 'react';
import Button from '@mui/material/Button';

export default function OutlinedButton({title, handleAction}) {
    return (
        <Button variant="outlined" onClick={handleAction}>{title}</Button>
    );
}