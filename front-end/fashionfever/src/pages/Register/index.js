import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react'
import { styled } from '@mui/styles'
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { login } from "../../store"
import { useDispatch } from 'react-redux'
import { Loader2 } from '../../components/Loader2'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

const CssTextField = styled(TextField)({
    input: {
        color: "yellow"
    },
    '&:hover label': {
        color: '#fdd835',
    },
    '& label': {
        color: '#fdd835A0',
    },
    '& label.Mui-focused': {
        color: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fdd835A0',
        },
        '&:hover fieldset': {
            borderColor: '#fdd835',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'yellow',
        },
    },
});

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
    
    const [displ, setDispl] = React.useState("none");

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
    <>
        <br/>
        <Loader2 disp={displ} />
        <Container maxWidth="md" sx={{backgroundColor: "transparent", backdropFilter: "blur(5px)", textAlign: "center",
            paddingBottom: "40px", paddingTop: "10px", marginTop: "7%", borderRadius: "20px", border: "1px solid #fdd835" }}>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item sx={{ color: "#fdd835" }}>
                    <h1>Register</h1>
                </Grid>
                <Grid item justifyItems='center'>
                    <CssTextField error={!chFname} required label="First Name" fullWidth value={values.first_name}
                        onChange={handleChange('first_name')}/>
                </Grid>
                <Grid item>
                    <CssTextField error={!chLname} required label="Last Name" fullWidth value={values.last_name}
                        onChange={handleChange('last_name')}/>
                </Grid>
                <Grid item>
                    <CssTextField error={!chEmail} required label="Email" fullWidth value={values.email} onChange={handleChange('email')}/>
                </Grid>
                <Grid item>
                    <CssTextField error={!chPass} required label="Password" fullWidth value={values.password}
                        onChange={handleChange('password')} type={showPassword ? 'text' : 'password'} InputProps={{endAdornment:
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff sx={{ color: "#fdd835" }} /> : <Visibility sx={{ color: "#fdd835" }} />}
                              </IconButton>
                            </InputAdornment>
                        }}/>
                </Grid>
                <Grid item>
                    <CssTextField error={!chPass2} required label="Confirm Password" type={showPassword ? 'text' : 'password'}
                        fullWidth value={checkPassword} onChange={handleChange2('checkPassword')}/>
                </Grid>
                {errorComp}
                <Grid item>
                    <Link sx={{ color: "#fdd835A0", textDecorationColor: "#fdd835a0", '&:hover': { color: "#fdd835" } }} onClick={() =>{navigate('/Login')}}>Already have a account?</Link>
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
                            setDispl("")
                            let json = JSON.stringify(values)
                            let heads = {"Content-Type": "application/json"}
                            axios.post("http://localhost:5000/register", json, {headers: heads}).then((res) => {
                                setDispl("none");
                                if(res.data)
                                {
                                    setLog(true);
                                    dispatch(login({ email: values.email, address: res.data.address, 
                                        first_name: res.data.first_name,
                                        last_name: res.data.last_name,
                                        phone_number: res.data.phone_number,
                                        profile_image: res.data.phone_number,
                                        gender: res.data.gender,
                                        bio: res.data.bio,
                                    }));
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