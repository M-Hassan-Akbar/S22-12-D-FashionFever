import React from "react"
import {Box, Typography, Grid, Divider, Card, List, ListItem} from "@mui/material"
import {useState} from "react";

export const AdminOrders = () => {
    const [values,setValues] = useState(["a","b","c"]);
    return (
        <>
            <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "1%", border: "2px solid #fdd835",
                    padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)" }}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant='h5' sx={{ color: "#fdd835" }}>Admin Orders View</Typography>
                    </Grid>
                    <Grid item>
                        <Divider sx={{backgroundColor:"#fdd835"}}/>
                    </Grid>
                    <Grid item>
                        <List>
                            {values.map((key,i) => (
                                <ListItem>
                                    <Card sx={{marginLeft:"3%", background:"#525252",borderRadius: "15px", width: "40%", height:"50px"}}>
                                        <Typography sx={{color:"#fdd835", marginLeft:"3%", marginTop:"12px"}}>{key}</Typography>
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