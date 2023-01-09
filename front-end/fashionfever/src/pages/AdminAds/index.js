// import { Link } from "react-router-dom"
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import MainCard from '../../components/Card';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../../components/Loader';

export const AdminAds = () => {
    let state = useSelector((state) => state.users);

    const [itemData, setItemData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [dispLoad, setDispLoad] = React.useState("flex");
    const [dispCards, setDispCards] = React.useState("none");
    const [disp, setDisp] = React.useState(true);

    const navigate = useNavigate();

    // console.log(state);

    React.useEffect(() => {
        // background animation
        // if(document.getElementById('stars'))
        //     exec();

        if(count === 0)
        {
            axios.post('http://localhost:5002/getad').then((res) => {
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
    }, [itemData, disp])

    return (
        <>
            {/* <br/>
            <br/>

            <Divider light={true} variant="middle" sx={{ display: "block", borderBottomWidth: 5, backgroundColor: "#fdd835",
                borderRadius: 5 }} /> */}
            <Typography variant="h5" sx={{marginTop:"25px", marginLeft:"10%",color : "#fdd835"}}>Admin Ads View</Typography>
            <Divider sx={{marginLeft:"10%", marginTop:"5px", width:"80%", backgroundColor:"#fdd835"}}/>
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