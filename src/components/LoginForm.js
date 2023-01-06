import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';


export default function BasicTextFields({title1, title2, setEmail, setPassword, handleChange, reRoute}) {
    return (
        <div className='login'>
            <div className="heading-container">
                <h3>
                    {title1} Form
                </h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="email" 
                    label="Enter Email" 
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField 
                    id="password" 
                    label="Enter Password" 
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <div>
                <Button title={title1} handleChange={handleChange} />
                <Button title={title2} handleChange={reRoute} />
            </div>
        </div>
    );
}