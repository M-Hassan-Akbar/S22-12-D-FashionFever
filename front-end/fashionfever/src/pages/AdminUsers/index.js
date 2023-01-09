import React from "react";
import { VerifiedUser } from "@mui/icons-material";
import { useState } from "react";
import {Box, Grid, Typography, List, ListItem, Avatar, Card} from "@mui/material"
import { useNavigate } from "react-router-dom";

export const AdminUsers = () => {
    const [values, setValues] = useState(["a","b","c"] );
    const navigate = useNavigate();
    const handleClick = (event,prop) =>{
        //Navigate to the ViewProfile(prop)
        console.log(prop);
    }

    return(
        <>
            <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "1%", border: "2px solid #fdd835",
                padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)" }}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant='h5' sx={{ color: "#fdd835" }}>Admin Users View</Typography>
                    </Grid>
                    <Grid item>
                        <List>
                            {values.map((key,i) => (
                                <ListItem>
                                    <Card sx={{marginLeft:"3%", background:"#525252",borderRadius: "15px", width: "40%", height:"50px"}} onClick={(e)=>handleClick(e,key)}>
                                        <Grid container direction="row" spacing={2}>
                                            <Grid item>
                                                <Avatar sx={{marginLeft:"10%", marginTop:"5px"}}>
                                                    <VerifiedUser/>
                                                </Avatar>
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{color:"#fdd835" ,marginLeft:"5%", marginTop:"12px"}}>
                                                    {key}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}