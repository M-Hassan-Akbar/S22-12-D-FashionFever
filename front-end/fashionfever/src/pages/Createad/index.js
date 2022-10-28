// import { Link } from "react-router-dom"
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Grid, ImageList, ImageListItem, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import axios from 'axios';

export const CreateAd = () => {
    let state = useSelector((state) => state.users);

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [values, setValues] = useState({
        desc: '',
    });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const inputFile = React.useRef(null);

    let elem;

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
        
        setImage(files[0]);
        }
    };
    
    const onButtonClick = () => {
        inputFile.current.click();
    };

    const [imagearray, setImagearray] = React.useState([]);
    const [imurl, setImurl] = React.useState('');

    // React.useEffect(() => {
    //     console.log(image)
    // }, inputFile)

    React.useEffect(() => {
        if(state.value.email === "")
          navigate('/Home');
        
        let temp = new Object();
        temp.email = state.value.email;
        let json = JSON.stringify(temp);
        let heads = {"Content-Type": "application/json"};
        axios.post("http://localhost:5002/getimages", json, {headers: heads}).then((res) => {
          if(res.data)
          {
            setImagearray(res.data.images);
          }
        });
    }, [state.value.email]);

    React.useEffect(() => {
        console.log(imurl);
    }, [imurl])

    React.useEffect(() => {
        elem = <Grid item xs={8}><Typography variant="p">top</Typography></Grid>;
        // console.log(elem);
    }, [image])

    return (
        <>
            <Box sx={{marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid gray",
                padding: "3%", borderRadius: "5px"}}>
                <Typography variant="h5">Create Ad</Typography>
                <Divider/>
                <br/>
                <Grid container spacing={10}>
                    <Grid item xs={8}>
                        <Grid container direction='column' rowSpacing={2}>
                            <Grid item>
                                <TextField label="Description" value={values.desc} multiline rows={4} variant="outlined" fullWidth
                                    onChange={handleChange('desc')}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Container maxWidth="md" sx={{ height: "200px", justifyContent: "center", textAlign: "center", paddingBottom: "40px",
                            paddingTop: "10px", marginTop: "10px", borderRadius: "20px", border: "2px solid" }}>
                                <input style={{ display: "none" }} ref={inputFile} onChange={handleFileUpload} type="file" />
                                <Grid container direction='column' rowSpacing={2} alignItems="center">
                                    <Grid item xs={2}>
                                        <Button variant="contained" sx={{ minWidth: "160px"}}
                                            onClick={onButtonClick}>Upload Photo</Button>
                                    </Grid>
                                    {elem}
                                </Grid>
                                {/* <img src={image} */}
                        </Container>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => {
                            let full_name = state.value.first_name.concat(state.value.last_name); 
                            axios.post(
                            `http://localhost:5002/addad?email=${state.value.email}&description=${values.desc}&phone_number=${state.value.phone_number}&full_name=${full_name}&url=${imurl}`,
                            {file: image}, { headers: { 'Content-Type': 'multipart/form-data' }},
                                ).then(function (response) {
                                    console.log(response.data);
                                    setImage(response.data.user.profile_image);
                                    console.log(image);
                                });
                        }}>Create</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {imagearray.map((item) => (
                                <ImageListItem key={item.url}>
                                <img src={`${item.url}`} srcSet={`${item.url}`} alt={item.title} loading="lazy" onClick={() => {
                                    setImurl(item.url);
                                }}/>
                            </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}