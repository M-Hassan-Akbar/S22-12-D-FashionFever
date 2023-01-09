import * as React from 'react';
import {useState, useRef} from 'react';
import {Box, Typography, Grid, TextField, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send'
import emailjs from '@emailjs/browser';

const CssTextField = styled(TextField)({
    input: {
        color: "yellow"
    },
    '&:hover label': {
        color: '#fdd835',
    },
    '& label': {
        color: '#fdd835A0',
    },
    '& label.Mui-focused': {
        color: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fdd835A0',
        },
        '&:hover fieldset': {
            borderColor: '#fdd835',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'yellow',
        },
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#fdd835A0",
        "& fieldset": {
            borderColor: "#fdd835A0"
        }
    },
});

export const ContactSupport = () => {
    const [email,setEmail] = useState("");
    const [content,setContent] = useState("");
    const supportform = useRef();

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var emailcontent = {
            from_name : email,
            message : content
        }
        emailjs.send('service_odkzd2f','template_n0d6dna',emailcontent,'80TMRqEMEFL60xxw-').then(function(response){
            console.log('Sent Successfully',response.status, response.text);
        }, function(error) {
            console.log('Error in Sending', error);
        }

        );
        console.log(email);
        console.log(content);
    }

    React.useState(() => {
        if(localStorage.getItem('email') === "")
        {
            navigate('/Login');
        }
    }, [])

    return(
        <>
            <Box sx={{ marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "1%", border: "2px solid #fdd835",
                padding: "3%", borderRadius: "5px", backdropFilter: "blur(10px)" }}>
                <form ref={supportform} onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Typography sx={{color: "#fdd835"}} variant="h5">Contact Support</Typography>
                        </Grid>
                        <Grid item>
                            <CssTextField label="Your Email" required defaultValue={email} onChange={handleEmail}
                                variant="outlined" sx={{width: "81%"}}
                                inputProps={{ inputMode:'email', pattern:'[^ @]*@[^ @]*.[^ @]'}}/>
                        </Grid>
                        <Grid item>
                            <CssTextField label="Your Issue" required defaultValue={content} onChange={handleContent} 
                                variant="outlined" sx={{width: "81%"}} multiline rows={4}/>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' endIcon={<SendIcon/>} type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    )
}