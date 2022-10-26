import { Avatar, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { useSelector } from 'react-redux';

const genders = [
    'Male',
    'Female',
    'Prefer not to say',
  ];

export const Profile = () => {
    let state = useSelector((state) => state.users);

    const [startDate, setStartDate] = useState("11/11/2011");
    const [gender, setGender] = useState('');

    const handleGender = (event) => {
        const {
          target: { value },
        } = event;
        setGender(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    

    return (
        <>
            <Box sx={{marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid gray", padding: "3%",
                borderRadius: "5px"}}>
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
                                <Button variant="contained" sx={{ minWidth: "150px"}}>Upload Photo</Button>
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
                        <TextField id="outlined-basic" label="Username" variant="outlined" sx={{width: "40%"}} />
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
                        <TextField id="outlined-basic" label="Status" variant="outlined" sx={{width: "40%"}}
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
                        <TextField id="outlined-basic" label="Phone Number" variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <TextField id="outlined-basic" value={state.value.email} label="Email" variant="outlined" sx={{width: "40%"}} />
                    </Grid>
                    <Grid item>
                        <br/>
                        <Divider/>
                        <br/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" sx={{ float: "right", minWidth: "150px"}}>Save changes</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}