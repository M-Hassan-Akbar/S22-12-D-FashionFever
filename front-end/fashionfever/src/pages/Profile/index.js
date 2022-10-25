import { Avatar, Box, Button, Divider, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";

export const Profile = () => {
    const [startDate, setStartDate] = useState("11/11/2011");

    return (
        <>
            <Box sx={{marginLeft: "10%", marginTop: "4%", marginRight: "10%", border: "2px solid gray", padding: "2%", borderRadius: "5px"}}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h5" sx={{margin: "0.5%"}}>My Profile</Typography>
                    </Grid>
                    <Divider/>
                    <Grid item>
                        <Typography variant="h6" sx={{margin: "0.5%"}}>Profile Photo</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container sx={{marginBottom: "10%"}}>
                            <Grid item>
                                <Avatar alt="profile pic" src="" sx={{ margin: "0.5%", marginLeft: "10%", width: 100, height: 100}} />
                            </Grid>
                            <Grid item>
                                <Button sx={{ marginLeft: "30%", marginTop: "20%", minWidth: "150px"}}>Upload Photo</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid item>
                        <Typography variant="h6" sx={{margin: "0.5%"}}>Basic Information</Typography>
                    </Grid>
                    <Grid item>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{width: "40%", margin: "0.5%"}} />
                    </Grid>
                    <Grid item sx={{margin: "0.5%", marginTop: "2%"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Date of Birth" value={startDate} onChange={(newValue) => { setStartDate(newValue); }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}