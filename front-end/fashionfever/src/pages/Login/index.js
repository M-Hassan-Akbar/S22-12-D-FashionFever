import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react'
// import { Link } from 'react-router-dom'

export const Login = () => {
    const [values, setValues] = React.useState({
        username: '',
        password: '',
    });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return(
    <>
        <Container maxWidth="md" sx={{backgroundColor: "#71cda7", textAlign: "center", paddingBottom: "40px", paddingTop: "10px", marginTop: "60px", borderRadius: "20px"}}>
            <h1>Log In</h1>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item>
                    <TextField required label="Username" fullWidth value={values.email} onChange={handleChange('username')}/>
                </Grid>
                <Grid item>
                    <TextField required label="Password" type="password" fullWidth value={values.password} onChange={handleChange('password')}/>
                </Grid>
                <Grid item>
                    {/* <Link>Forgot Password?</Link>
                    <a>    -    </a>
                    <Link>Create account</Link> */}
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