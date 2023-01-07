import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MessageBox } from 'react-chat-elements';
import { useLocation } from 'react-router-dom';
import { Input } from 'react-chat-elements'
import React, { useState } from 'react';

export const Chat = () => {
    const location = useLocation();
    const inputReferance = React.createRef();
    const [array, setArray] = useState([{ sender: "Jalal", message: "Hi" },
        { sender: "Hassan", message: "Hi" },
        { sender: "Jalal", message: "Sup" },
        { sender: "Hassan", message: "not much" },
        { sender: "Hassan", message: "uni almost finished" },
        { sender: "Hassan", message: "Yay" },
    ]);

    const sendmessage = (prop) =>
    {
        let temp = [...array];
        temp.push({ sender: localStorage.getItem('first_name'), message: prop });
        setArray(temp);
    }

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
                                position={item.sender === localStorage.getItem('first_name') ? 'right' : 'left'}
                                type={'text'}
                                text={item.message}
                                date={new Date()}
                                status={"sent"}
                            />
                        )))}
                    </Box>
                </Grid>
                <Grid item sx={{ width: "70vw" }}>
                    <Box sx={{ marginLeft: "4vw", borderRadius: "5px", padding: "1%", maxWidth: "60vw", background: "#6c6c6c" }}>
                        <Input referance={inputReferance} placeholder='Type here...' autoHeight={true} multiline={true}
                            rightButtons={<Button sx={{ background: "#6c6c6c", color: "#fdd835", "&:hover": { background: "#fdd835", 
                            color: "black" } }} onClick={() => { sendmessage(inputReferance.current.value);
                            inputReferance.current.value = ""; }}>Send</Button>}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}