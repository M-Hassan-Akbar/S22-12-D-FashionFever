import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react'
import { login } from "../../store"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Link } from '@mui/material'

const person = {
    email: "abcd@example.com",
    password: "1234",
};

export const Login = () => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });
    
    const [showError, setShowError] = React.useState(null);

    let errorText;
    if(showError)
    {
        errorText = <Typography variant='p' color='error'>Incorrect username or password!</Typography>
    }
    else
    {
        errorText = <></>
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(showError === false)
        {
            navigate('/Home');
        }
    })
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return(
    <>
        <Container maxWidth="md" sx={{backgroundColor: "#71cda7", textAlign: "center", paddingBottom: "40px", paddingTop: "10px", marginTop: "150px", borderRadius: "20px"}}>
            <h1>Log In</h1>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item>
                    <TextField required label="Email" fullWidth value={values.email} onChange={handleChange('email')}/>
                </Grid>
                <Grid item>
                    <TextField required label="Password" type="password" fullWidth value={values.password} onChange={handleChange('password')}/>
                </Grid>
                <Grid item>
                    {/* <Link>Forgot Password?</Link> */}
                    <>    -    </>
                    <br/>
                    <Link onClick={() =>{navigate('/Register')}}>Create account</Link>
                </Grid>
                {errorText}
                <Grid item>
                    <Button variant='contained' color='primary' onClick={() => {
                        if(values.email === person.email && values.password === person.password)
                        {
                            setShowError(false);
                            dispatch(login({ email: values.email, password: values.password }));
                        }
                        else
                        {
                            setShowError(true);
                        }
                    }}>Login</Button>
                </Grid>
            </Grid>
        </Container>
    </>
    )
}