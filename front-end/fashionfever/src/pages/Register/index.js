import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from '@mui/material'

export const Register = () => {
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        checkPassword: '',
    });

    const navigate = useNavigate();
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return(
    <>
        <Container maxWidth="md" sx={{backgroundColor: "#71cda7", textAlign: "center", paddingBottom: "40px", paddingTop: "10px", marginTop: "60px", borderRadius: "20px"}}>
            <h1>Register</h1>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item justifyItems='center'>
                    <TextField required label="First Name" fullWidth value={values.firstName} onChange={handleChange('firstName')}/>
                </Grid>
                <Grid item>
                    <TextField label="Last Name" fullWidth value={values.lastName} onChange={handleChange('lastName')}/>
                </Grid>
                <Grid item>
                    <TextField required label="Email" fullWidth value={values.email} onChange={handleChange('email')}/>
                </Grid>
                <Grid item>
                    <TextField required label="Password" type="password" fullWidth value={values.password} onChange={handleChange('password')}/>
                </Grid>
                <Grid item>
                    <TextField required label="Confirm Password" type="password" fullWidth value={values.checkPassword} onChange={handleChange('checkPassword')}/>
                </Grid>
                <Grid item>
                    <Link onClick={() =>{navigate('/Login')}}>Already have a account?</Link>
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary' onClick={() => {
                        alert('Add Register Functionality')
                    }}>Register</Button>
                </Grid>
            </Grid>
        </Container>
    </>
    )
}