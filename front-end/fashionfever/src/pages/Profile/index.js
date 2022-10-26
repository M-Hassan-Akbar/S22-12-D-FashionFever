import { Alert, Avatar, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";

const genders = [
    'Male',
    'Female',
    'Prefer not to say',
  ];

export const Profile = () => {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        bio: '',
        phone_number: '',
    });
    
    let state = useSelector((state) => state.users);
    const [startDate, setStartDate] = useState("11/11/2011");
    const [gender, setGender] = useState('');
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
    };

    const [image, setImage] = useState("");

    const inputFile = useRef(null);

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
        
        setImage(files[0]);
        console.log(image);
        }
    };

    const onButtonClick = () => {
        inputFile.current.click();
    };
    
    const firstUpdate = useRef(true);

    useEffect(() => {
        if(firstUpdate.current) {
            firstUpdate.current = false;
            return;
        };
        
        axios.post(`http://localhost:5000/updateprofileimage?email=${state.value.email}`, {file: image}, { headers: {
            'Content-Type': 'multipart/form-data'
            }},
            ).then(function (response) {
                console.log(response.data);
            });
    }, [image])

    return (
        <>
            <Box sx={{marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid gray",
                padding: "3%", borderRadius: "5px"}}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="h5">My Profile</Typography>
                    </Grid>
                    <Grid item>
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Profile Photo</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container sx={{alignItems: "center"}} spacing={5} >
                            <Grid item>
                                <Avatar alt="profile pic" src="" sx={{ width: 150, height: 150}} />
                            </Grid>
                            <Grid item>
                                <input style={{ display: "none" }} ref={inputFile} onChange={handleFileUpload} type="file" />
                                <Button variant="contained" sx={{ minWidth: "150px"}} onClick={onButtonClick} >Upload Photo</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <br/>
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Basic Information</Typography>
                    </Grid>
                    <Grid item>
                        <TextField label="Username" value={values.username} onChange={handleChange('username')}
                            variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                            <DatePicker label="Date of Birth" value={startDate} onChange={(newValue) => { setStartDate(newValue); }}
                                renderInput={(params) => <TextField {...params} sx={{width: "40%"}} />}
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
                        <TextField label="Address" value={values.address} onChange={handleChange('address')}
                            variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <TextField label="Status" value={values.bio} onChange={handleChange('bio')} variant="outlined"
                            sx={{width: "40%"}}
                            multiline rows={4} />
                    </Grid>
                    <Grid item>
                        <br/>
                        <Divider/>
                        <br/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Contact Information</Typography>
                    </Grid>
                    <Grid item>
                        <TextField label="Phone Number" value={values.phone_number} onChange={handleChange('phone_number')}
                            variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <TextField disabled value={state.value.email} label="Email" variant="outlined"
                            sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <br/>
                        <Divider/>
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