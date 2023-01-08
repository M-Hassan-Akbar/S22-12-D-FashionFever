import Grid from '@mui/material/Grid'
import React from 'react'
import { Box, styled } from '@mui/material'
import { useLocation } from 'react-router-dom';

const Img = styled('img')({
    // margin: 'auto',
    display: 'inline',
    maxWidth: '80%',
    maxHeight: '80%',
  });

export const ImgPage = () => {
    const location = useLocation();

    return(
    <>
        <Box maxWidth="md" sx={{ marginLeft: "auto", marginTop: "4%", marginRight: "auto", marginBottom: "4%", border: "2px solid #fdd835",
            padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)" }}>
            <Grid container direction="row">
                <Grid item xs={6}>
                    <Img alt="Clothes Image" src={location.state.imgP}/>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="column" alignItems="flex-start">
                        <Grid item>
                            <h1>{location.state.imgT}</h1>
                        </Grid>
                        <Grid item>
                            {location.state.imgD}
                        </Grid>
                        <br/>
                        <Grid item>
                            Email: {location.state.imgE}
                        </Grid>
                        <Grid item>
                             Phone Number: {location.state.imgPh}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </>
    )
}