import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { login } from "../../store"
import { useDispatch } from 'react-redux'

export const Register = () => {
    const [values, setValues] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const [checkPassword, setCheckPassword] = React.useState('');
    const [match, setMatch] = React.useState(true);
    const [chFname, setChFname] = React.useState(true);
    const [chLname, setChLname] = React.useState(true);
    const [chEmail, setChEmail] = React.useState(true);
    const [chPass, setChPass] = React.useState(true);
    const [chPass2, setChPass2] = React.useState(true);
    const [log, setLog] = React.useState(false);

    let errorComp;

    if(match)
        errorComp = <></>
    else
        errorComp = <Grid item><Typography variant="p" sx={{color: "Red"}}>The password doesn't match</Typography></Grid>

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange2 = (prop) => (event) => {
        setCheckPassword( event.target.value )
    }
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    React.useEffect(() => {
        if(log === true)
        {
            navigate('/Home');
        }
    })

    return(
    <>
        <Container maxWidth="md" sx={{backgroundColor: "#6ac4af", textAlign: "center", paddingBottom: "40px", paddingTop: "10px", marginTop: "100px", borderRadius: "20px"}}>
            <h1>Register</h1>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item justifyItems='center'>
                    <TextField error={!chFname} required label="First Name" fullWidth value={values.first_name} onChange={handleChange('first_name')}/>
                </Grid>
                <Grid item>
                    <TextField error={!chLname} required label="Last Name" fullWidth value={values.last_name} onChange={handleChange('last_name')}/>
                </Grid>
                <Grid item>
                    <TextField error={!chEmail} required label="Email" fullWidth value={values.email} onChange={handleChange('email')}/>
                </Grid>
                <Grid item>
                    <TextField error={!chPass} required label="Password" type="password" fullWidth value={values.password} onChange={handleChange('password')}/>
                </Grid>
                <Grid item>
                    <TextField error={!chPass2} required label="Confirm Password" type="password" fullWidth value={checkPassword} onChange={handleChange2('checkPassword')}/>
                </Grid>
                {errorComp}
                <Grid item>
                    <Link onClick={() =>{navigate('/Login')}}>Already have a account?</Link>
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary' onClick={() => {
                        if(values.first_name === "")
                        {
                            setChFname(false);
                        }
                        else if(values.last_name === "")
                        {
                            setChLname(false);
                        }
                        else if(values.email === "")
                        {
                            setChEmail(false);
                        }
                        else if(values.password === "")
                        {
                            setChPass(false);
                        }
                        else if(checkPassword === "")
                        {
                            setChPass2(false);
                        }
                        else if(values.password !== checkPassword)
                        {
                            setMatch(false);
                        }
                        else
                        {
                            let json = JSON.stringify(values)
                            console.log(json);
                            let heads = {"Content-Type": "application/json"}
                            axios.post("http://localhost:5000/register", json, {headers: heads}).then((res) => {
                                if(res.data)
                                {
                                    setLog(true);
                                    dispatch(login({ email: values.email, password: values.password }));
                                }
                            });
                        }
                    }}>Register</Button>
                </Grid>
            </Grid>
        </Container>
    </>
    )
}