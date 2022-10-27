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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];
