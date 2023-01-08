import { Alert, Avatar, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography, Paper } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import * as React from 'react';
import MainCard from '../../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../../components/Loader';

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
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#fdd835A0",
        "& fieldset": {
            borderColor: "#fdd835A0"
        }
    },
});


//prop for the user profile opened
export const ViewProfile = (prop) => {
    let state = useSelector((state) => state.users);
    const location = useLocation();
    const [values, setValues] = useState({
        user: location.state.first_name + " " + location.state.last_name,
        first_name: location.state.first_name,
        last_name: location.state.last_name,
        email: location.state.email,
        bio: location.state.bio,
        phone_number: location.state.phone_number,
    });

    const [itemData, setItemData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [dispLoad, setDispLoad] = React.useState("flex");
    const [dispCards, setDispCards] = React.useState("none");
    const [disp, setDisp] = React.useState(true);

    const navigate = useNavigate();

    React.useEffect(() => {
        // background animation
        // if(document.getElementById('stars'))
        //     exec();

        if(count === 0)
        {
            let temp = {
                email: location.state.email,
            }
            let json = JSON.stringify(temp);
            let heads = {"Content-Type": "application/json"};
            axios.post('http://localhost:5002/userads', json, { headers: heads }).then((res) => {
                if(res.data)
                {
                    setItemData(res.data.ads);
                    // console.log(res.data.ads);
                    // console.log(toLoad)
                    setDisp(false)
                }
            });
            setCount(count + 1);
        }

        if(!disp)
        {
            setDispLoad("none");
            setDispCards("a");
        }
    }, [itemData, disp, location.state.email])

    return (
        <>
            <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "1%", border: "2px solid #fdd835",
                padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)" }}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography sx={{color: "#fdd835"}} variant="h5">{values.last_name}</Typography>
                    </Grid>
                    <Grid item>
                        <Divider sx={{ backgroundColor: "#fdd835" }}/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ color: "#fdd835" }} variant="h6">Profile Photo</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar alt="profile pic" src={state.profile_image} sx={{ width: 150, height: 150}} />
                    </Grid>
                    <Grid item>
                        <Divider sx={{ backgroundColor: "#fdd835" }}/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ color: "#fdd835" }} variant="h6">Basic Information</Typography>
                    </Grid>
                    <Grid item>
                        <CssTextField label="First Name" disabled value={values.first_name} 
                            variant="outlined" sx={{width: "40%", marginRight:"1%"}} />
                        <CssTextField label="Last Name" disabled value={values.last_name} 
                            variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <CssTextField label="Email" disabled value={values.email} 
                            variant="outlined" sx={{width: "40%", marginRight:"1%"}} />
                        <CssTextField label="Phone Number" disabled value={values.phone_number} 
                            variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <CssTextField label="Bio" disabled value={values.phone_number} 
                            variant="outlined" sx={{width: "81%"}} multiline rows={4}/>
                    </Grid>
                </Grid>
            </Box>
            <Grid sx={{ paddingLeft: "10%",paddingRight: "10%"}}>
                <Grid item>
                    <Typography sx={{ paddingLeft: "3%",color: "#fdd835"}} variant="h6">Advertisements by {values.last_name}</Typography>
                </Grid>
                <Grid item>
                    <Divider sx={{ backgroundColor: "#fdd835"}}/>
                </Grid>
            </Grid>
            <Loader disp={`${dispLoad}`}/>
            <Grid container sx={{ padding: "5%", display: `${dispCards}` }} spacing={4} justifyContent="center">
                {itemData.map((item, i) => (
                    <Grid item key={i}>
                        <MainCard imgP={item.url} imgT={item.name} imgD={item.description} imgPh={item.phone_number} imgE={item.email}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}