import React from "react";
import {Box, Grid, Typography, Divider, ButtonBase, Card } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminView = () => {
    const [images,setImages] = useState(0);
    const [users, setUsers] = useState(0);
    const [averagerating,setAveragerating] = useState(0);
    const [ads,setAds] = useState(0);
    const [orders,setOrders] = useState(0);
    const [ongoingorders,setOngoingorders] = useState(0);
    const [completedorders,setCompletedorders] = useState(0);
    const navigate = useNavigate();
    const handleImages = (event) => {
        navigate('/AdminImages')
    }

    const handleUsers = (event) => {
        navigate('/AdminUsers')
    }

    const handleAds = (event) => {
        navigate('/AdminAds')
    }

    const handleOrders = (event) => {
        navigate('/AdminOrders')
    }

    React.useEffect(() => {
        if(localStorage.getItem('Admin') === false)
        {
            navigate('/Login');
        }
        
        axios.get('http://localhost:5003/dashboard').then((res) => {
            if(res.data)
            {
                console.log(res.data);
            }
        });
    }, [])

    return (
        <>
            <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "1%", border: "2px solid #fdd835",
                padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)" }}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant='h5' sx={{ color: "#fdd835" }}>Admin View</Typography>
                    </Grid>
                    <Grid item>
                        <Divider sx={{ backgroundColor: "#fdd835" }} />
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={3}>
                            <Grid item>
                                <Card sx={{ background:"#6c6c6c", borderRadius: "15px", width: "345px", minHeight: "110px", maxHeight: "600px", cursor: "pointer" }} onClick={handleUsers}>
                                    <Typography variant="h6" sx={{ marginLeft: "12px",marginTop: "8px",color:"#fdd835"}}>Users</Typography>
                                    <Divider sx={{ backgroundColor: "#fdd835" }}/>
                                    <Card sx={{marginLeft:"3%", marginTop:"10px", background:"#525252",borderRadius: "15px", width: "94%", height:"50px"}}>
                                        <Typography sx={{marginLeft:"12px", marginTop:"12px",color:"#fdd835"}}>
                                            Total Users: {users}
                                        </Typography>
                                    </Card>
                                </Card>
                                <Card sx={{ background:"#6c6c6c",marginTop:"3%", borderRadius: "15px", width: "345px", minHeight: "110px", maxHeight: "600px", cursor: "pointer" }} onClick={handleAds}>
                                    <Typography variant="h6" sx={{ marginLeft: "12px",marginTop: "8px",color:"#fdd835"}}>Ads</Typography>
                                    <Divider sx={{ backgroundColor: "#fdd835" }}/>
                                    <Card sx={{marginLeft:"3%", marginTop:"10px", background:"#525252",borderRadius: "15px", width: "94%", height:"50px"}}>
                                        <Typography sx={{marginLeft:"12px", marginTop:"12px",color:"#fdd835"}}>
                                            Total Ads: {ads}
                                        </Typography>
                                    </Card>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ background:"#6c6c6c", borderRadius: "15px", width: "345px", minHeight: "230px", maxHeight: "600px", cursor: "pointer" }} onClick={handleImages}>
                                    <Typography variant="h6" sx={{ marginLeft: "12px",marginTop: "8px",color:"#fdd835"}}>Images</Typography>
                                    <Divider sx={{ backgroundColor: "#fdd835" }}/>
                                    <Card sx={{marginLeft:"3%", marginTop:"10px", background:"#525252",borderRadius: "15px", width: "94%", height:"50px"}}>
                                        <Typography sx={{marginLeft:"12px", marginTop:"12px",color:"#fdd835"}}>
                                            Total Images: {images}
                                        </Typography>
                                    </Card>
                                    <Card sx={{marginLeft:"3%", marginTop:"8px", background:"#525252",borderRadius: "15px", width: "94%", height:"50px"}}>
                                        <Typography sx={{marginLeft:"12px", marginTop:"12px",color:"#fdd835"}}>
                                            Average Rating: {averagerating}
                                        </Typography>
                                    </Card>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ background:"#6c6c6c", borderRadius: "15px", width: "345px", minHeight: "230px", maxHeight: "600px", cursor: "pointer" }} onClick={handleOrders}>
                                    <Typography variant="h6" sx={{ marginLeft: "12px",marginTop: "8px",color:"#fdd835"}}>Orders</Typography>
                                    <Divider sx={{ backgroundColor: "#fdd835" }}/>
                                    <Card sx={{marginLeft:"3%", marginTop:"10px", background:"#525252",borderRadius: "15px", width: "94%", height:"50px"}}>
                                        <Typography sx={{marginLeft:"12px", marginTop:"12px",color:"#fdd835"}}>
                                            Total Orders: {orders}
                                        </Typography>
                                    </Card>
                                    <Card sx={{marginLeft:"3%", marginTop:"10px", background:"#525252",borderRadius: "15px", width: "94%", height:"50px"}}>
                                        <Typography sx={{marginLeft:"12px", marginTop:"12px",color:"#fdd835"}}>
                                            Ongoing Orders: {ongoingorders}
                                        </Typography>
                                    </Card>
                                    <Card sx={{marginLeft:"3%", marginTop:"8px", background:"#525252",borderRadius: "15px", width: "94%", height:"50px"}}>
                                        <Typography sx={{marginLeft:"12px", marginTop:"12px",color:"#fdd835"}}>
                                            Completed Orders: {completedorders}
                                        </Typography>
                                    </Card>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}