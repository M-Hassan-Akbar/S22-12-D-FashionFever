import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import * as React from "react";
import Navbar from '../../components/Navbar'

export const GenImage = () => {

    return (
        <>
            <Navbar/>
            <Container maxWidth="md" sx={{backgroundColor: "#71cda7", textAlign: "center", paddingBottom: "40px", paddingTop: "10px", marginTop: "150px", borderRadius: "20px"}}>
                <h1>Image Generation</h1>
                <Grid container direction='column' rowSpacing={2}>
                    <Grid item>
                        <TextField required label="Description" fullWidth/>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={() => {alert('Get image');}}>Submit</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}