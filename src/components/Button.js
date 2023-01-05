import React from 'react';
import Button from '@mui/material/Button';

export default function BasicButton({title, handleChange}) {
    return (
        <Button variant="contained" onClick={handleChange}>{title}</Button>
    );
}