import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Images() {
    const [imagearray, setImagearray] = React.useState([]);

    const navigate = useNavigate();

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

    return (
        <>
            <Box sx={{marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid #fdd835",
                padding: "3%", borderRadius: "5px", height: "70vh" }}>
                <Typography variant="h4">My Images</Typography>
                <Divider/>
                <ImageList variant="masonry" cols={3} gap={8} sx={{ height: "50vh", overflowX: "scroll" }}>
                    {imagearray.map((item) => (
                        <ImageListItem key={item.url}>
                        <img src={`${item.url}`} srcSet={`${item.url}`}
                          alt={item.title}  loading="lazy" />
                        <Typography variant="p">{item.caption}</Typography>
                    </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </>
    );
}
