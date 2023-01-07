import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MessageBox } from 'react-chat-elements';
import { useLocation } from 'react-router-dom';
import { Input } from 'react-chat-elements'
import React from 'react';


// Clear text, e.g.:

// inputClear = () => {}
// // ...
// ;<Input clear={clear => (inputClear = clear)} placeholder='Type here...' />
// // ...
// inputClear()

export const Chat = () => {
    const location = useLocation();
    const inputReferance = React.createRef();

    return(
        <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid #fdd835",
                padding: "4% 4% 25% 4%", borderRadius: "5px", backdropFilter: "blur(10px)", maxHeight: "75vh" }}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Typography sx={{ color: "#fdd835" }} variant="h5">Message</Typography>
                </Grid>
                <Grid item>
                    <Divider sx={{ backgroundColor: "#fdd835" }}/>
                </Grid>
                <Grid item>
                    <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", background: "#6c6c6c",
                        padding: "4%", borderRadius: "5px", backdropFilter: "blur(10px)", overflowY: "scroll", maxHeight: "40vh" }}>
                        <MessageBox
                            position={'right'}
                            type={'text'}
                            text={location.state.message}
                            date={new Date()}
                            status={"sent"}
                        />
                        <MessageBox
                            position={'right'}
                            type={'text'}
                            text={"pineapple"}
                            date={new Date()}
                            status={"sent"}
                        />
                        <MessageBox
                            position={'left'}
                            type={'text'}
                            text={"why?"}
                            date={new Date()}
                            status={"sent"}
                        />
                        <MessageBox
                            position={'right'}
                            type={'text'}
                            text={"just cuz"}
                            date={new Date()}
                            status={"sent"}
                        />
                        <MessageBox
                            position={'right'}
                            type={'text'}
                            text={"just cuz"}
                            date={new Date()}
                            status={"sent"}
                        />
                        <MessageBox
                            position={'right'}
                            type={'text'}
                            text={"just cuz"}
                            date={new Date()}
                            status={"sent"}
                        />
                        <MessageBox
                            position={'right'}
                            type={'text'}
                            text={"just cuz"}
                            date={new Date()}
                            status={"sent"}
                        />
                        <MessageBox
                            position={'right'}
                            type={'text'}
                            text={"just cuz"}
                            date={new Date()}
                            status={"sent"}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Input
                        referance={inputReferance}
                        placeholder='Type here...'
                        multiline={true}
                        rightButtons={<Button>Send</Button>}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}