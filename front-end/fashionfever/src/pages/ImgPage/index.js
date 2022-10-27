import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import React from 'react'
import { styled } from '@mui/material'
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
        <Container maxWidth="md" sx={{backgroundColor: "#71cda7", textAlign: "center", paddingBottom: "40px", paddingTop: "40px",
            marginTop: "100px", borderRadius: "20px"}}>
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
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </>
    )
}