// import { Link } from "react-router-dom"
import * as React from 'react';
// import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
import MainCard from '../../components/Card';
import { Grid } from '@mui/material';
// import "./index.css"
// import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../../components/Loader';
import 'react-chat-elements/dist/main.css'

export const Home = () => {

    const [itemData, setItemData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [dispLoad, setDispLoad] = React.useState("flex");
    const [dispCards, setDispCards] = React.useState("none");
    const [disp, setDisp] = React.useState(true);

    React.useEffect(() => {

        if(count === 0)
        {
            axios.post('http://localhost:5002/getad').then((res) => {
                if(res.data)
                {
                    setItemData(res.data.ads);
                    setDisp(false);
                }
            });
            setCount(count + 1);
        }

        if(!disp)
        {
            setDispLoad("none");
            setDispCards("a");
        }
    }, [itemData, disp, count])

    return (
        <>
            <Loader disp={`${dispLoad}`}/>
            <Grid container sx={{ padding: "5%", display: `${dispCards}` }} spacing={4} justifyContent="center">
                {itemData.map((item, i) => (
                    <Grid item key={i}>
                        <MainCard imgP={item.url} imgT={item.title} imgD={item.description} imgPh={item.phone_number} imgE={item.email} imgData={item}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}