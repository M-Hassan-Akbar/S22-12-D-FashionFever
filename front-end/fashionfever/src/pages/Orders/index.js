import { Box, Divider, Grid, Typography } from "@mui/material"
import axios from "axios"
import React from "react"


export const Orders = () => {

    React.useEffect(() => {
        let temp = {
            email: localStorage.getItem('email'),
        }
        let json = JSON.stringify(temp);
        let heads = {"Content-Type": "application/json"};
        axios.post('http://localhost:5004/getorders', json, { headers: heads }).then((res) => {
            if(res.data)
            {
                console.log(res.data);
            }
        });                
    }, [])

    return(
        <>
            <Box maxWidth="md" sx={{ marginLeft: "auto", marginTop: "4%", marginRight: "auto", marginBottom: "4%", border: "2px solid #fdd835",
                padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)", height: "80vh" }}>
                <Grid container alignItems='center' direction="column" spacing={1}>
                    <Grid item>
                        <Typography sx={{ color: "#fdd835" }} variant="h5">My Orders</Typography>
                    </Grid>
                    <Grid item>
                        <Divider sx={{ backgroundColor: "#fdd835" }}/>
                    </Grid>
                    <Grid justifyContent='space-evenly' item container>
                        
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
