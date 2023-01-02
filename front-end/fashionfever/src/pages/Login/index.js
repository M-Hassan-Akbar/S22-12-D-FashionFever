import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react'
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import { Loader2 } from '../../components/Loader2'
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
// import { useSelector } from 'react-redux'

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

export const Login = () => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });

    const [chEmail, setChEmail] = React.useState(true);
    const [chPass, setChPass] = React.useState(true);

    const [showPassword, setShowPassword] = React.useState(false);

    // let state = useSelector((state) => state.users);
    
    const [showError, setShowError] = React.useState(null);
    const [displ, setDispl] = React.useState("none");

    let errorText;
    if(showError)
    {
        errorText = <Typography variant='p' color='error'>Incorrect username or password!</Typography>
    }
    else
    {
        errorText = <></>
    }

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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
    <>
        <br/>
        <Loader2 disp={displ} />
        <Container maxWidth="md" sx={{backgroundColor: "none", backdropFilter: "blur(10px)", textAlign: "center", paddingBottom: "40px",
            paddingTop: "10px", marginTop: "10%", borderRadius: "20px", border: "1px solid #fdd835"}}>
            <Grid container direction='column' rowSpacing={2} justifyContent="center" >
                <Grid item sx={{ color: "#fdd835" }}>
                    <h1>Log In</h1>
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
                    {/* <Link>Forgot Password?</Link> */}
                    <>    -    </>
                    <br/>
                    <Link sx={{ color: "#fdd835A0", textDecorationColor: "#fdd835a0", '&:hover': { color: "#fdd835" } }}
                        onClick={() =>{navigate('/Register')}}>Create account</Link>
                </Grid>
                {errorText}
                <Grid item>
                    <Button variant='contained' color='primary' onClick={() => {
                        if(values.email === "")
                        {
                            setChEmail(false);
                        }
                        else if(values.password === "")
                        {
                            setChPass(false);
                        }
                        else
                        {
                            setDispl("");
                            let json = JSON.stringify(values)
                            let heads = {"Content-Type": "application/json"}
                            axios.post("http://localhost:5000/login", json, {headers: heads}).then((res) => {
                                setDispl("none");
                                if(res.data)
                                {
                                    setShowError(false);
                                    // dispatch(login({ email: values.email, address: res.data.user.address, 
                                    //     first_name: res.data.user.first_name,
                                    //     last_name: res.data.user.last_name,
                                    //     phone_number: res.data.user.phone_number,
                                    //     profile_image: res.data.user.profile_image,
                                    //     gender: res.data.user.gender,
                                    //     bio: res.data.user.bio,
                                    // }));
                                    localStorage.setItem("email", values.email);
                                    localStorage.setItem("address", res.data.user.address);
                                    localStorage.setItem("first_name", res.data.user.first_name);
                                    localStorage.setItem("last_name", res.data.user.last_name);
                                    localStorage.setItem("phone_number", res.data.user.phone_number);
                                    localStorage.setItem("profile_image", res.data.user.profile_image);
                                    localStorage.setItem("gender", res.data.user.gender);
                                    localStorage.setItem("bio", res.data.user.bio);
                                }
                                else
                                {
                                    setShowError(true);
                                }
                            }).catch((err) => {
                                setShowError(true);
                                setDispl("none");
                            });
                        }
                    }}>Login</Button>
                </Grid>
            </Grid>
        </Container>
    </>
    )
}