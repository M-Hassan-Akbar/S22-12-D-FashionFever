import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MainCard(props) {

  const customSX = {
    transition: "height 400ms ease-in-out",
    "&:hover": {height: 256},
  };

  const navigate = useNavigate();

  return (
    <Card sx={{ width: 345, minHeight: 300, maxHeight: 500, cursor: "pointer" }} onClick={() => {
      navigate('/ImgPage', {state: {imgP: props.imgP, imgT: props.imgT, imgD: props.imgD}})}}>
      <CardActionArea height="800">
        <CardMedia
          component="img"
          height="140"
          image={props.imgP}
          alt="Clothes Pic"
          sx={customSX}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.imgT}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.imgD}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
