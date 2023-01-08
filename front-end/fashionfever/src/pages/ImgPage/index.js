import Grid from '@mui/material/Grid'
import React, { useState } from 'react'
import { Box, Divider, Fab, InputAdornment, styled, TextField, Tooltip } from '@mui/material'
import { useLocation } from 'react-router-dom';
import { InfoOutlined } from '@mui/icons-material';

const Img = styled('img')({
    // margin: 'auto',
    display: 'inline',
    maxWidth: '80%',
    maxHeight: '80%',
  });

export const ImgPage = () => {
    const location = useLocation();
    const [Data,setData] = useState({
        name: "",
        gender: "",
        height: "",
        waist: "",
        chest: "",
        neck: "",
        necktosh: "",
        sleeve: "",
        wrist: "",
        arm: "",
        shoulders: "",
        hips: "",
        ankles: "",
        thigh: "",
        calf: "",
    });

    const handleChange = (event,field) => {
        var tempState = Data;
        tempState[field] =  event.target.value;
        setData(tempState);
    };

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
                <Grid item>
                    <Divider sx={{backgroundcolor: "#fdd835"}}/>
                </Grid>
                <Grid item>
                    <TextField label="Height" type="number" defaultValue={Data.height} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"height")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}}
                    title="Measure yourself barefoot in cm.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Waist" type="number" defaultValue={Data.waist} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"waist")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}} title="Put arms down and bend at your elbows. Where your elbow points is your natural waist. Take a 360° measurement at that point of your waist.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Chest" type="number" defaultValue={Data.chest} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"chest")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}} title="Take a 360° measurement at the widest point of your chest. Measure with your arms down rather than out to the side.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Neck" type="number" defaultValue={Data.neck} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"neck")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}} title="Take a 360° measurement at base of your neck.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Neck to Shoulder" type="number" defaultValue={Data.necktosh} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"necktosh")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}} title="Take a 360° measurement at base of your neck.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Sleeve" type="number" defaultValue={Data.sleeve} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"sleeve")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}} title="Measure from your shoulder bone to your wrist bone.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Wrist" type="number" defaultValue={Data.wrist} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"wrist")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}} title="Take a 360° measurement around your wrist.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Widest Point of Upper Arm" type="number" defaultValue={Data.arm} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"arm")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}} title="Take a 360° measurement of the widest part of your upper arm. ">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Shoulder to Shoulder" type="number" defaultValue={Data.shoulders} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"shoulders")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}} title="Measure from one shoulder bone to the other across the front of your neck to the other shoulder bone.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Widest Point on Hips" type="number" defaultValue={Data.hips} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"hips")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}}
                    title="Measure approximately 8’’ below your waist, at the widest point of your hips. Take a 360° measurement, with your feet together.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Waist to Ankles" type="number" defaultValue={Data.ankles} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"ankles")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}}
                    title="Measure outside the body from your waist to your ankle.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Widest Point on Single Thigh" type="number" defaultValue={Data.thigh} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"thigh")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}}
                    title="Wrap the measuring tape around the thickest part of your thigh, with legs straight. Take a 360° measurement.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <TextField label="Widest point on Calf" type="number" defaultValue={Data.calf} InputLabelProps={{ shrink: true }}  onChange={(e)=>{handleChange(e,"calf")}}
                            variant="outlined" sx={{width: "50%"}} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>
                            }}/>
                    <Tooltip sx={{marginLeft:"1%" ,marginTop:"1%"}}
                    title="Take a 360° measurement of the widest part of your calf.">
                        <Fab  size="small">
                            <InfoOutlined/>
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
    </>
    )
}