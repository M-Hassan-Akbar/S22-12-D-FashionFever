import { Button, Divider, Fab, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MessageBox } from 'react-chat-elements';
import { useLocation } from 'react-router-dom';
import { Input } from 'react-chat-elements'
import React, { useRef, useState } from 'react';
import { Add } from '@mui/icons-material';
import axios from 'axios';

export const Chat = () => {
    const location = useLocation();
    const inputReferance = React.createRef();
    const inputFile = useRef(null);
    const [image, setImage] = useState("");
    const [array, setArray] = useState([]);

    const sendmessage = (prop) =>
    {
        let heads = {'Content-Type': 'multipart/form-data'};
axios.post(`http://localhost:5001/sendmessage?email=${localStorage.getItem('email')}&message=${prop}&timestamp=${Date.now()}&conversation=${location.state.key}`, { headers: heads }).then((res) => {
        if(res.data)
        {
            let t = [...array];
            t.push({ sender: localStorage.getItem('email'), message: prop, image: image, timestamp: new Date(Date.now() * 1000) });
            setArray(t);
        }
        });
    }

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
        
        setImage(URL.createObjectURL(files[0]));
        }
    };

    const onButtonClick = () => {
        inputFile.current.click();
    };

    React.useEffect(() => {
        let temp = {
            conversation: location.state.key,
        }
        console.log(location.state.key);
        let json = JSON.stringify(temp);
        let heads = {"Content-Type": "application/json"};
        axios.post('http://localhost:5001/getmessages', json, { headers: heads }).then((res) => {
            if(res.data)
            {
                setArray(res.data.messages);
            }
        });
    }, [])

    return(
        <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid #fdd835",
                padding: "4% 4% 25% 4%", borderRadius: "5px", backdropFilter: "blur(10px)", maxHeight: "75vh" }}>
            <Grid container direction="column" spacing={2} alignItems="center">
                <Grid item sx={{ width: "auto" }}>
                    <Typography sx={{ color: "#fdd835" }} variant="h5">{location.state.otherguy}</Typography>
                </Grid>
                <Grid item>
                    <Divider sx={{ backgroundColor: "#fdd835" }}/>
                </Grid>
                <Grid item sx={{ width: "70vw" }}>
                    <Box sx={{ background: "#6c6c6c", padding: "2%", borderRadius: "5px", backdropFilter: "blur(10px)",
                        overflowY: "scroll", height: "40vh" }}>
                        {(array.map((item, i) => (
                            <MessageBox key={i}
                                position={item.sender === localStorage.getItem('email') ? 'right' : 'left'}
                                type={item.image === "" ? 'text' : 'photo'}
                                text={item.message}
                                date={new Date()}
                                status={item.sender === localStorage.getItem('email') ? "sent" : "none"}
                                data={item.image === "" ? {} : { uri : image }}
                            />
                        )))}
                    </Box>
                </Grid>
                <Grid item sx={{ width: "70vw" }}>
                    <Box sx={{ marginLeft: "4vw", borderRadius: "5px", padding: "1%", maxHeight: "15vh", maxWidth: "60vw", background: "#6c6c6c" }}>
                        <Input referance={inputReferance} placeholder='Type here...' minHeight={"5vh"} maxHeight={"200vh"} autoHeight={true} multiline={true}
                            rightButtons={
                                <div>
                                    <input style={{ display: "none" }} ref={inputFile} onChange={handleFileUpload} type="file" />
                                    <Fab sx={{ background: "#6c6c6c", color: "#fdd835", "&:hover": { background: "#fdd835" },
                                        "&:hover #hov": {color: "black"} }} onClick={() => {onButtonClick()}} >
                                        <IconButton id="hov" sx={{ color: "#fdd835" }} >
                                            <Add />
                                        </IconButton>
                                    </Fab>
                                    <Button sx={{ marginLeft: "2%", background: "#6c6c6c", color: "#fdd835", "&:hover": { 
                                        background: "#fdd835", color: "black" } }} onClick={() => { sendmessage(
                                        inputReferance.current.value); inputReferance.current.value = ""; }}>
                                        Send
                                    </Button>
                                </div>
                            }
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}