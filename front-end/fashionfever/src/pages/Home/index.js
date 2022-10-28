// import { Link } from "react-router-dom"
import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import MainCard from '../../components/Card';
import { Box, Grid, Paper } from '@mui/material';
import background from "../../data/background.jpg";
// import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Home = () => {
    let state = useSelector((state) => state.users);

    const [itemData, setItemData] = React.useState([]);
    const [count, setCount] = React.useState(0);

    const navigate = useNavigate();

    React.useEffect(() => {
        if(count === 0)
        {
            axios.post('http://localhost:5002/getad').then((res) => {
                if(res.data)
                {
                    setItemData(res.data.ads);
                    console.log(res.data.ads);
                }
            });
            setCount(count + 1);
        }
    })

    return (
        <>
            <Fab sx={{ float: "flex-end", margin: "10px" }} color="primary" aria-label="add" onClick={() => {
                if(state.value.email === "")
                {
                    navigate('/Login');
                }
                else
                {
                    navigate('/Createad')
                }}}>
                <AddIcon />
            </Fab>
            <Fab sx={{ float: "right", margin: "10px" }} color="secondary" aria-label="add" onClick={() => {
                if(state.value.email === "")
                {
                    navigate('/Login');
                }
                else
                {
                    navigate('/GenImage')
                }}}>
                <AddIcon />
            </Fab>
            <br/>
            
            <Grid container sx={{padding: "5%",}} spacing={4} justifyContent="center">
                {itemData.map((item, i) => (
                    <Grid item key={i}>
                        <MainCard imgP={item.url} imgT={item.name} imgD={item.description} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}