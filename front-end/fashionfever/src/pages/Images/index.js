import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Images() {
    const [imagearray, setImagearray] = React.useState([]);

    let state = useSelector((state) => state.users);
    const navigate = useNavigate();

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

    return (
        <>
            <Box sx={{marginLeft: "10%", marginTop: "4%", marginRight: "10%", marginBottom: "4%", border: "2px solid gray",
                padding: "3%", borderRadius: "5px"}}>
                <Typography variant="h4">My Images</Typography>
                <Divider/>
                <ImageList variant="masonry" cols={3} gap={8}>
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
