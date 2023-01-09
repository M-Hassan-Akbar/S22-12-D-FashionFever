// import { Link } from "react-router-dom"
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, FormControlLabel, Grid, ImageList, ImageListItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import axios from 'axios';

export const CreateAd = () => {
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [values, setValues] = useState({
        title: '',
        desc: '',
        price: '',
    });
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const inputFile = React.useRef(null);

    const elem = React.useRef(null);

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

    React.useEffect(() => {
        if(localStorage.getItem('email') === "")
          navigate('/Home');
        
        let temp = {
            email: "",
        };
        temp.email = localStorage.getItem('email');
        let json = JSON.stringify(temp);
        let heads = {"Content-Type": "application/json"};
        axios.post("http://localhost:5002/getimages", json, {headers: heads}).then((res) => {
          if(res.data)
          {
            setImagearray(res.data.images);
          }
        });
    }, [navigate]);

    React.useEffect(() => {
    }, [imurl])

    const [measurements, setMeasurements] = useState([]);

    React.useEffect(() => {
        if(localStorage.getItem('email') === "")
        {
            navigate('/Login');
        }

        let t = {
            email: localStorage.getItem('email'),
        }
        let json = JSON.stringify(t);
        let heads = {"Content-Type": "application/json"};
        axios.post("http://localhost:5000/getmeasurements", json, {headers: heads}).then((res) => {
          if(res.data)
          {
            setMeasurements(res.data.measurements);
          }
      });
    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange2 = (event) => {
        setValue(event.target.value);
    };

    React.useEffect(() => {
        elem.current = <Grid item xs={8}><Typography variant="p">top</Typography></Grid>;
    }, [image])

    return (
        <>
            <Box sx={{marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid #fdd835",
                padding: "3%", borderRadius: "5px"}}>
                <Typography variant="h5">Create Ad</Typography>
                <Divider/>
                <br/>
                <Grid container spacing={10}>
                    <Grid item xs={8}>
                        <Grid container direction='column' rowSpacing={2}>
                            <Grid item>
                                <TextField label="Title" value={values.title} variant="outlined" fullWidth
                                    onChange={handleChange('title')}/>
                            </Grid>
                            <Grid item>
                                <TextField label="Description" value={values.desc} multiline rows={4} variant="outlined" fullWidth
                                    onChange={handleChange('desc')}/>
                            </Grid>
                            <Grid item>
                                <TextField label="Price" value={values.price} variant="outlined" fullWidth
                                    onChange={handleChange('price')}/>
                            </Grid>
                            <Grid item>
                                <Typography variant="h7" sx={{ color: "#fdd835" }}>Measurements</Typography>
                            </Grid>
                            <Grid item>
                                <RadioGroup
                                    value={value}
                                    onChange={handleChange2}
                                    name="radio-buttons-group"
                                >
                                    {measurements.map((item, i) => (
                                        <FormControlLabel key={i} value={i} control={<Radio />} label={item.name} />
                                    ))}
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Container maxWidth="md" sx={{ height: "200px", justifyContent: "center", textAlign: "center",
                            paddingBottom: "40px", paddingTop: "10px", marginTop: "10px", borderRadius: "20px", border: "2px solid" }}>
                                <input style={{ display: "none" }} ref={inputFile} onChange={handleFileUpload} type="file" />
                                <Grid container direction='column' rowSpacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={6} container justifyContent="center">
                                        <Button variant="contained" sx={{ width: "160px"}}
                                            onClick={onButtonClick}>Upload Photo</Button>
                                    </Grid>
                                </Grid>
                        </Container>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => {
                            let full_name = localStorage.getItem('first_name').concat(" "); 
                            full_name = full_name.concat(localStorage.getItem('last_name'));
                            axios.post(
`http://localhost:5002/addad?email=${localStorage.getItem('email')}&description=${values.desc}&phone_number=${localStorage.getItem('phone_number')}&full_name=${full_name}&url=${imurl}&price=${values.price}&title=${values.title}&gender=${measurements[value].gender}&height=${measurements[value].height}&waist=${measurements[value].waist}&chest=${measurements[value].chest}&neck=${measurements[value].neck}&necktosh=${measurements[value].necktosh}&sleeve=${measurements[value].sleeve}&wrist=${measurements[value].wrist}&arm=${measurements[value].arm}&shoulders=${measurements[value].shoulders}&hips=${measurements[value].hips}&ankles=${measurements[value].ankles}&thigh=${measurements[value].thigh}&calf=${measurements[value].calf}`,
                            {file: image, url: imurl}, { headers: { 'Content-Type': 'multipart/form-data' }},
                                ).then(function (response) {
                                    console.log(response);
                                    navigate('/Home');
                                });
                        }}>Create</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {imagearray.map((item) => (
                                <ImageListItem key={item.url} sx={{ '&:hover': { cursor: "pointer" } }}>
                                    <img src={`${item.url}`} srcSet={`${item.url}`} alt={item.title} loading="lazy" onClick={() => {
                                        setImurl(item.url);
                                        console.log(item.url);
                                    }} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}