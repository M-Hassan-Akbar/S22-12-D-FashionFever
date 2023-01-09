import { Box, Card, Divider, Fab, Grid, Snackbar, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export const Orders = () => {
    const navigate = useNavigate();
    const [ord, setOrd] = useState([]);
    const [msg, setMsg] = useState("");

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setOpen(false);
        window.location.reload(false);
    };

    React.useEffect(() => {
        if(localStorage.getItem('email') === "")
        {
            navigate('/Login');
        }

        let temp = {
            email: localStorage.getItem('email'),
        }
        let json = JSON.stringify(temp);
        let heads = {"Content-Type": "application/json"};
        axios.post('http://localhost:5004/getorders', json, { headers: heads }).then((res) => {
            if(res.data)
            {
                setOrd(res.data.orders);
            }
        });
    }, [])

    const dothework = (prop) => {
        let temp = {
            pk: prop,
        }
        let json = JSON.stringify(temp);
        let heads = {"Content-Type": "application/json"};
        axios.post('http://localhost:5002/getadwithpk', json, { headers: heads }).then((res) => {
            if(res.data)
            {
                console.log(res.data);
                navigate('/ImgPage', { state: { imgP: res.data.ad.url, imgT: res.data.ad.title, imgD: res.data.ad.description,
                    imgPh: res.data.ad.phone_number, imgE: res.data.ad.email, imgData: res.data.ad } })
            }
        });
    }

    return(
        <>
            <Box maxWidth="md" sx={{ marginLeft: "auto", marginTop: "4%", marginRight: "auto", marginBottom: "4%",
                border: "2px solid #fdd835", padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)", height: "80vh" }}>
                <Grid container alignItems='center' direction="column" spacing={1}>
                    <Grid item>
                        <Typography sx={{ color: "#fdd835" }} variant="h5">My Orders</Typography>
                    </Grid>
                    <Grid item>
                        <Divider sx={{ backgroundColor: "#fdd835" }}/>
                    </Grid>
                    <Grid justifyContent='space-evenly' item container>
                        {ord.map((item, i) => (
                            <Grid key={i} item sx={{ textAlign: "center", background: "#6c6c6c", borderRadius: "15px", width:"20%" }}>
                                <Card sx={{ textAlign: "center", background: "#6c6c6c", borderRadius: "15px",
                                    width:"100%", height:"12vh" }} >
                                    <Typography variant="h6" onClick={() => {dothework(item.ad)}} sx={{ cursor: "pointer",
                                        marginTop: "8px", color:"#fdd835"}}>Order {i + 1}</Typography>
                                    <Grid justifyContent="space-evenly" container>
                                        <Grid item>
                                            <Fab size="small" sx={{ boxShadow: "0", background: "#6c6c6c", color: "#fdd835", "&:hover": {
                                                background: "#fdd835" }, "&:hover .hov": {color: "black"} }} onClick={() => {
                                                    let temp = {
                                                        order_key: item.order_key,
                                                    }
                                                    let json = JSON.stringify(temp);
                                                    let heads = {"Content-Type": "application/json"};
                                                    axios.post('http://localhost:5004/rejectorders', json, { headers: heads }).then((res) => {
                                                        if(res.data)
                                                        {
                                                            setMsg('Rejected');
                                                            console.log(res.data);
                                                            handleClick();
                                                        }
                                                    });
                                                }}>
                                                <CancelIcon className="hov" />
                                            </Fab>
                                        </Grid>
                                        <Grid item>
                                            <Fab size="small" sx={{ boxShadow: "0", background: "#6c6c6c", color: "#fdd835", "&:hover": {
                                                background: "#fdd835" }, "&:hover .hov": {color: "black"} }} onClick={() => {
                                                    let temp = {
                                                        order_key: item.order_key,
                                                    }
                                                    let json = JSON.stringify(temp);
                                                    let heads = {"Content-Type": "application/json"};
                                                    axios.post('http://localhost:5004/acceptorders', json, { headers: heads }).then((res) => {
                                                        if(res.data)
                                                        {
                                                            setMsg('Accepted!');
                                                            console.log(res.data);
                                                            handleClick();
                                                        }
                                                    });
                                                }}>
                                                <CheckCircleIcon className="hov" />
                                            </Fab>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={msg}
                    // action={action}
                />
            </Box>
        </>
    )
}
