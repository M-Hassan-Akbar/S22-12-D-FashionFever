import { Box, Button, Divider, Modal ,IconButton, FormControl, Grid, InputLabel, InputAdornment,
    MenuItem, Select, TextField, Typography, Fab, Tooltip, Card, Backdrop, Fade } from "@mui/material";
import { Add, DeleteForeverOutlined, InfoOutlined, SaveOutlined, EditOutlined } from "@mui/icons-material"
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const genders = [
    'Male',
    'Female',
    'Prefer not to say',
  ];

const formStyle = {
    // These 4 below are positionings I used for larger 
    // height viewports - centered
    position: 'absolute', 
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // other styles...
    width: '60%',
    maxWidth: '800px',
    minWidth: '270px',
    bgcolor: '#6A6A69',
    boxShadow: 24,
    border: "2px solid #fdd835",
    py: 4,
    borderRadius: 3,
    zIndex: 100,
    // media query @ the max height you want (my case is the 
    // height of the viewport before the cutoff phenomenon) - 
    // set the top to '0' and translate the previous 'y' 
    // positioning coordinate so the top of the modal is @ the 
    // top of the viewport
    '@media(max-height: 890px)': {
        top: '0',
        transform: 'translate(-50%, 0%)'
    }
};

var Index=0;

export const Measurements = () => {
    let state = useSelector((state) => state.users);
    const [values, setValues] = useState([]);
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{
        setOpen(false);
    }
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () =>{
        setOpen2(false);
    }

    const handleChange = (event,field) => {
        var tempState = Data;
        tempState[field] =  event.target.value;
        setData(tempState);
    };

    const OpenModal = (prop) => (event) => {
        setData(values[prop.i]);
        Index=prop.i;
        handleOpen2();
    };
    
    const save = () => {
        var tempState = values;
        tempState[Index] = Data;

        var tempObj = {
            email: localStorage.getItem('email'),
            name: tempState[Index].name,
            gender: tempState[Index].gender,
            height: tempState[Index].height,
            waist: tempState[Index].waist,
            chest: tempState[Index].chest,
            neck: tempState[Index].neck,
            necktosh: tempState[Index].necktosh,
            sleeve: tempState[Index].sleeve,
            wrist: tempState[Index].wrist,
            arm: tempState[Index].arm,
            shoulders: tempState[Index].shoulders,
            hips: tempState[Index].hips,
            ankles: tempState[Index].ankles,
            thigh: tempState[Index].thigh,
            calf: tempState[Index].calf,
        }

        let json = JSON.stringify(tempObj);
        let heads = {"Content-Type": "application/json"};

        axios.post('http://localhost:5000/addmeasurements', json, { headers: heads }).then((res) => {
            if(res.data)
            {
                console.log(res.data);
                setValues(tempState);
                handleClose();
            }
        })
    }

    const save2 = () => {
        var tempState = values;
        tempState[Index] = Data;
        
        var tempObj = {
            email: localStorage.getItem('email'),
            name: tempState[Index].name,
            gender: tempState[Index].gender,
            height: tempState[Index].height,
            waist: tempState[Index].waist,
            chest: tempState[Index].chest,
            neck: tempState[Index].neck,
            necktosh: tempState[Index].necktosh,
            sleeve: tempState[Index].sleeve,
            wrist: tempState[Index].wrist,
            arm: tempState[Index].arm,
            shoulders: tempState[Index].shoulders,
            hips: tempState[Index].hips,
            ankles: tempState[Index].ankles,
            thigh: tempState[Index].thigh,
            calf: tempState[Index].calf,
        }

        let json = JSON.stringify(tempObj);
        let heads = {"Content-Type": "application/json"};
        
        axios.post('http://localhost:5000/updatemeasurements', json, { headers: heads }).then((res) => {
            if(res.data)
            {
                console.log("update ", res.data);
                setValues(tempState);
                handleClose2();
            }
        })
    }

    const addNew = () => {
        var tempState = values;
        var tempNew = {};
        tempState.push(tempNew);
        setValues(tempState);
        var keys= Object.keys(values);
        Index=(keys.length)-1;
        setData(values[Index]);
        handleOpen();
    }

    const deleteMeasurement = () =>{
        var tempState = values;
        tempState.splice(Index,1);
        setValues(tempState);
        handleClose();
    }

    const navigate = useNavigate();

    const deleteMeasurement2 = () =>{
        var tempState = values;
        console.log(Index);
        
        var tempObj = {
            email: localStorage.getItem('email'),
            name: tempState[Index].name,
        }
        
        let json = JSON.stringify(tempObj);
        let heads = {"Content-Type": "application/json"};
        
        axios.post('http://localhost:5000/deletemeasurements', json, { headers: heads }).then((res) => {
            if(res.data)
            {
                console.log("delete ", res.data);
                tempState.splice(Index,1);
                setValues(tempState);
                handleClose2();
                window.location.reload(false); // because page breaks on delete
            }
        })
    }

    React.useEffect(() => {
        var tempObj = {
            email: localStorage.getItem('email'),
        }

        let json = JSON.stringify(tempObj);
        let heads = {"Content-Type": "application/json"};

        axios.post("http://localhost:5000/getmeasurements", json, { headers: heads }).then((res) => {
            if(res.data)
            {
                setValues(res.data.measurements);
            }
        })
    }, [values, Data]);

    return (
        <>
        <Box sx={{marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid #fdd835",
                padding: "3%" ,paddingBottom:"5%", borderRadius: "5px", backdropFilter:"blur(10px)"}}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Typography sx={{color: "#fdd835"}} variant="h5">My Measurements</Typography>
                </Grid>
                <Divider/>
                {values.map((item,i) => (
                    <Card key={i} sx={{marginTop:"1%", background: "#6c6c6c", borderRadius: "15px", width:"50%" , height:"50px" }}>
                        <Grid justifyContent= "space-between" container>
                                <Typography sx={{ color: "#fdd835", marginTop:"13px", marginLeft:"2%"}}>{item.name}</Typography>
                                <IconButton onClick={OpenModal({i})} sx={{float:"right" ,marginTop:"6px"}}>
                                    <EditOutlined/>
                                </IconButton>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    sx={{overflowY: 'scroll'}} disableScrollLock={false}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                    timeout: 500,
                                    }}
                                    >
                                    <Fade in={open}>
                                    <Box sx={formStyle}>
                                        <Grid sx={{marginLeft:'12%'}} container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography sx={{ color: "#fdd835" }} variant="h5">My Measurements</Typography>
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Measurement Name" defaultValue={Data.name} InputLabelProps={{ shrink: true }} onChange={(e)=>{handleChange(e,"name")}}
                                                        variant="outlined" sx={{width: "50%"}} />
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth>
                                                        <InputLabel id="demo-select-small">Gender</InputLabel>
                                                        <Select labelId="demo-select-small" id="demo-select-small" defaultValue={Data.gender} label="Gender"
                                                            onChange={(e)=>{handleChange(e,"gender")}} sx={{width: "50%"}}>
                                                            {genders.map((temp) => (
                                                                <MenuItem key={temp} value={temp}>
                                                                    {temp}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
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
                                            <Grid item sx={{marginLeft:"65%",float:"right"}}>
                                                <Button onClick={handleClose}>
                                                    <Fab>
                                                        <CancelIcon/>
                                                    </Fab>
                                                </Button>
                                                <Button onClick={deleteMeasurement}>
                                                    <Fab>
                                                        <DeleteForeverOutlined/>
                                                    </Fab>
                                                </Button>
                                                <Button onClick={save}>
                                                    <Fab>
                                                        <SaveOutlined/>
                                                    </Fab>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    </Fade>
                                </Modal>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    sx={{overflowY: 'scroll'}} disableScrollLock={false}
                                    open={open2}
                                    onClose={handleClose2}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                    timeout: 500,
                                    }}
                                    >
                                    <Fade in={open2}>
                                    <Box sx={formStyle}>
                                        <Grid sx={{marginLeft:'12%'}} container direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography sx={{ color: "#fdd835" }} variant="h5">My Measurements</Typography>
                                            </Grid>
                                            <Grid item>
                                                <TextField label="Measurement Name" defaultValue={Data.name} InputLabelProps={{ shrink: true }} onChange={(e)=>{handleChange(e,"name")}}
                                                        variant="outlined" sx={{width: "50%"}} />
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth>
                                                        <InputLabel id="demo-select-small">Gender</InputLabel>
                                                        <Select labelId="demo-select-small" id="demo-select-small" defaultValue={Data.gender} label="Gender"
                                                            onChange={(e)=>{handleChange(e,"gender")}} sx={{width: "50%"}}>
                                                            {genders.map((temp) => (
                                                                <MenuItem key={temp} value={temp}>
                                                                    {temp}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
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
                                            <Grid item sx={{marginLeft:"57%",float:"right"}}>
                                                <Button onClick={handleClose2}>
                                                    <Fab>
                                                        <CancelIcon/>
                                                    </Fab>
                                                </Button>
                                                <Button onClick={deleteMeasurement2}>
                                                    <Fab>
                                                        <DeleteForeverOutlined/>
                                                    </Fab>
                                                </Button>
                                                <Button onClick={save2}>
                                                    <Fab>
                                                        <SaveOutlined/>
                                                    </Fab>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    </Fade>
                                </Modal>
                        </Grid>
                    </Card>
                ))}
            </Grid>
            <Grid item sx={{float:"right"}}>
                <Fab>
                    <IconButton onClick={addNew} color="inherit">
                        <Add/>
                    </IconButton>
                </Fab>
            </Grid>
        </Box>
        </>
    );
}