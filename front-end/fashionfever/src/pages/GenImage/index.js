import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import * as React from "react";
import axios from 'axios'
import ImgList from "../../components/ImageList";
import Grow from '@mui/material/Grow';
// import Skel from "../../components/Skeleton";


export const GenImage = () => {
    const [imageUrl, setImageUrl] = React.useState('')
    const [loadImage, setLoadImage] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleGrowChange = () => {
        setChecked((prev) => !prev);
    };

    let elem;

    if(loadImage)
        elem = <Grow in={checked}><Grid item sx={{marginTop: "15vmin"}}><ImgList/></Grid></Grow>
    else
        elem = <></>
        // elem = <Grid item sx={{marginTop: "15vmin"}}><Skel/></Grid>

    // console.log(modal, loadModal)

    return (
        <>
            <Grid container alignItems="center" justifyContent="center" spacing={20}>
                <Grid item>
                    <Container maxWidth="md" sx={{backgroundColor: "#71cda7", width: "40vmax", textAlign: "center", paddingBottom: "40px", paddingTop: "10px", marginTop: "150px", borderRadius: "20px"}}>
                        <h1>Image Generation</h1>
                        <Grid container direction='column' rowSpacing={2}>
                            <Grid item>
                                <TextField required label="Description" fullWidth/>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={async () => {
                                    // const response = await axios.get('localhost:5000/GenImage');
                                    // setImageUrl(response.data)
                                    setLoadImage(true);
                                    handleGrowChange();
                                }}>Generate Image</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                {elem}
            </Grid>
        </>
    );
}