import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import * as React from "react";
import axios from 'axios'
import ImgList from "../../components/ImageList";
import Grow from '@mui/material/Grow';
import { useState } from "react";
import { useSelector } from 'react-redux';
import Skel from "../../components/Skeleton";


export const GenImage = () => {
    const [values, setValues] = useState({
        desc: '',
    });

    const [imageUrl, setImageUrl] = React.useState('')
    const [loadImage, setLoadImage] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    let state = useSelector((state) => state.users);

    const handleGrowChange = () => {
        setChecked((prev) => !prev);
    };

    let elem;
    elem = <Grid item sx={{marginTop: "15vmin"}}><Skel/></Grid>;

    const exec = () => {
        // elem = <Grow in={checked}><Grid item sx={{marginTop: "15vmin"}}><image src="" alt="Generated image"></image></Grid></Grow>;
        let temp = new Object();
        temp.email = state.value.email;
        temp.caption = values.desc;
        let json = JSON.stringify(temp);
        let heads = {"Content-Type": "application/json"};
        axios.post("http://localhost:5001/fashion", json, {headers: heads}).then((res) => {
            if(res.data)
            {
                console.log(res.data);
            }
        });
        // setValues({ ...values, desc: ""})
        setValues({desc: ""});
    }
    // if(loadImage)
    // {
    //     elem = <Grow in={checked}><Grid item sx={{marginTop: "15vmin"}}><image src="" alt="Generated image"></image></Grid></Grow>;
    //     let temp = new Object();
    //     temp.email = state.value.email;
    //     temp.caption = values.desc;
    //     let json = JSON.stringify(temp);
    //     let heads = {"Content-Type": "application/json"};
    //     axios.post("http://localhost:5001/fashion", json, {headers: heads}).then((res) => {
    //         if(res.data)
    //         {
    //             console.log(res.data);
    //         }
    //     });
    //     // setValues({ ...values, desc: ""})
    //     setValues({desc: ""});
    // }
    // else
    // {
    //     elem = <Grid item sx={{marginTop: "15vmin"}}><Skel/></Grid>
    //     console.log('no')
    // }
        // elem = <></>

    // console.log(modal, loadModal)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    React.useEffect(() => {
        if(values.desc === "")
            setLoadImage(false);
    }, [values.desc]);

    return (
        <>
            <Grid container alignItems="center" justifyContent="center" spacing={20}>
                <Grid item>
                    <Container maxWidth="md" sx={{backgroundColor: "#71cda7", width: "40vmax", textAlign: "center",
                        paddingBottom: "40px", paddingTop: "10px", marginTop: "150px", borderRadius: "20px"}}>
                        <h1>Image Generation</h1>
                        <Grid container direction='column' rowSpacing={2}>
                            <Grid item>
                                <TextField required value={values.desc} onChange={handleChange('desc')} label="Description"
                                    fullWidth/>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={ () => {
                                    // const response = await axios.get('localhost:5000/GenImage');
                                    // setImageUrl(response.data)
                                    console.log(values.desc);

                                    if(values.desc !== "")
                                        exec();
                                }}>Generate Image</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                {/* {elem} */}
                {/* <Grid item sx={{marginTop: "15vmin"}}>
                    <image src="" alt="Generated image"></image>
                </Grid> */}
            </Grid>
        </>
    );
}