import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';


export default function BasicTextFields({title1, title2, setEmail, setPassword, handleChange, reRoute}) {

    const onChangeEmail = useCallback(e => {
        setEmail(e.target.value);
    });

    const onChangePass = useCallback(e => {
        setPassword(e.target.value);
    });

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
                    onChange={onChangeEmail}
                />
                <TextField 
                    id="password" 
                    label="Enter Password" 
                    variant="outlined"
                    type="password"
                    onChange={onChangePass}
                />
            </Box>
            <div>
                <Button title={title1} handleChange={handleChange} />
                <Button title={title2} handleChange={reRoute} />
            </div>
        </div>
    );
}