import { Alert, Avatar, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

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

const genders = [
    'Male',
    'Female',
    'Prefer not to say',
  ];

export const Profile = () => {
    let state = useSelector((state) => state.users);
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: state.value.address,
        bio: state.value.bio,
        phone_number: state.value.phone_number,
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(state);

    const [startDate, setStartDate] = useState(state.value.date);
    const [gender, setGender] = useState(state.value.gender);
    const [open, setOpen] = useState(false);

    const submitted = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleGender = (event) => {
        const {
          target: { value },
        } = event;
        setGender(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
    };
    // setValues({...values, address: state.value.address, bio: state.value.bio})

    const [image, setImage] = useState("");

    const inputFile = useRef(null);

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
        
        setImage(files[0]);
        // console.log(image);
        }
    };

    const onButtonClick = () => {
        inputFile.current.click();
    };
    
    const firstUpdate = useRef(true);
    
    useEffect(() => {
        if(state.value.email === "")
        navigate('/Home');
        
        if(firstUpdate.current) {
            firstUpdate.current = false;
            return;
        };
        
        // console.log(state.value.profile_image);
        if(image !== "")
            axios.post(`http://localhost:5000/updateprofileimage?email=${state.value.email}`, {file: image}, { headers: {
                'Content-Type': 'multipart/form-data' }},
                ).then(function (response) {
                    submitted();
                    console.log(response.data);
                    setImage(response.data.user.profile_image);
                    // dispatch(login({ profile_image: response.data.user.profile_image }));
                });
    }, [image])

    return (
        <>
            <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid #fdd835",
                padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)" }}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography sx={{ color: "#fdd835" }} variant="h5">My Profile</Typography>
                    </Grid>
                    <Grid item>
                        <Divider sx={{ backgroundColor: "#fdd835" }}/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ color: "#fdd835" }} variant="h6">Profile Photo</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container sx={{alignItems: "center"}} spacing={5} >
                            <Grid item>
                                <Avatar alt="profile pic" src={state.profile_image} sx={{ width: 150, height: 150}} />
                            </Grid>
                            <Grid item>
                                <input style={{ display: "none" }} ref={inputFile} onChange={handleFileUpload} type="file" />
                                <Button variant="contained" sx={{ minWidth: "150px"}} onClick={onButtonClick} >Upload Photo</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <br/>
                        <Divider sx={{ backgroundColor: "#fdd835" }}/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ color: "#fdd835" }} variant="h6">Basic Information</Typography>
                    </Grid>
                    <Grid item>
                        <CssTextField label="Username" disabled value={state.email} onChange={handleChange('username')}
                            variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item sx={{ color: "#fdd835" }}>
                        <LocalizationProvider sx={{ color: "#fdd835" }} fullWidth dateAdapter={AdapterDayjs}>
                            <DatePicker label="Date of Birth" value={startDate} onChange={(newValue) => { setStartDate(newValue); }}
                                renderInput={(params) => <TextField {...params}
                                sx={{ width: "40%", "&:focused": { color: "#fdd835" } }} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-select-small">Gender</InputLabel>
                            <Select labelId="demo-select-small" id="demo-select-small" value={gender} label="Gender"
                                onChange={handleGender} sx={{width: "40%"}} >
                                {genders.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <CssTextField label="Address" value={values.address} onChange={handleChange('address')}
                            variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <CssTextField label="Status" value={values.bio} onChange={handleChange('bio')} variant="outlined"
                            sx={{width: "40%"}}
                            multiline rows={4} />
                    </Grid>
                    <Grid item>
                        <br/>
                        <Divider sx={{ backgroundColor: "#fdd835" }}/>
                        <br/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ color: "#fdd835" }} variant="h6">Contact Information</Typography>
                    </Grid>
                    <Grid item>
                        <CssTextField label="Phone Number" value={values.phone_number} onChange={handleChange('phone_number')}
                            variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <CssTextField disabled value={state.value.email} label="Email" variant="outlined"
                            sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <br/>
                        <Divider sx={{ backgroundColor: "#fdd835" }}/>
                        <br/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" sx={{ float: "right", minWidth: "150px"}} onClick={() => {
                            if(values.username !== "" || values.address !== "" || values.bio !== "" )
                            {
                                let temp = new Object();
                                // temp.username = values.username;
                                temp.address = values.address;
                                temp.bio = values.bio;
                                temp.dob = parseInt((new Date(startDate).getTime() / 1000).toFixed(0));
                                temp.email = state.value.email;
                                temp.phone_number = values.phone_number;
                                temp.gender = gender;
                                console.log(gender)
                                let json = JSON.stringify(temp);
                                let heads = {"Content-Type": "application/json"};
                                axios.post("http://localhost:5000/updateprofile", json, {headers: heads}).then((res) => {
                                    if(res.data)
                                    {
                                        submitted();
                                    }
                                });
                            }
                        }} >Save changes</Button>
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Profile Updated!
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}