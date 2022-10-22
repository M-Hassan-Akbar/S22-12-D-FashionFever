// import { Link } from "react-router-dom"
import * as React from 'react';
import Navbar from "../../components/Navbar"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Home = () => {
    let state = useSelector((state) => state.users);

    const navigate = useNavigate();

    return (
        <>
            <Navbar/>
            <h1>Home Page</h1>
            <Fab color="secondary" aria-label="add" onClick={() => {
                if(state.value.userID === 0)
                {
                    navigate('/Login');
                }
                else
                {
                    navigate('/GenImage')
                }}}>
                <AddIcon />
            </Fab>
        </>
    )
}