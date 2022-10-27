// import { Link } from "react-router-dom"
import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import MainCard from '../../components/Card';
import { Box, Grid, Paper } from '@mui/material';
import background from "../../data/background.jpg";

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        title: 'Chairs',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
        desc: 'Random text description.',
    },
    {
        img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
        title: 'Coffee table',
        desc: 'Random text description.',
    },
  ];

export const Home = () => {
    let state = useSelector((state) => state.users);

    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ backgroundImage: `url(${background})`, width: "100%", height: 700, display: 'flex', alignItems: 'flex-end',
                justifyContent: 'center', backgroundSize: '100% 100%', backgroundRepeat: "no-repeat" }}>
                <Fab sx={{ margin: "10px" }} color="secondary" aria-label="add" onClick={() => {
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
            </Box>
            <br/>
            
            <Grid container sx={{padding: "5%",}} spacing={4} justifyContent="center">
                {itemData.map((item, i) => (
                    <Grid item key={i}>
                        <MainCard imgP={item.img} imgT={item.title} imgD={item.desc} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}