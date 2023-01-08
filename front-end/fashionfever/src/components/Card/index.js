import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Tilt from "react-vanilla-tilt";

export default function MainCard(props) {

  const customSX = {
    transition: "height 400ms ease-in-out",
    borderRadius: "10px",
    "&:hover": { height: 300 },
  };

  const navigate = useNavigate();

  return (
    <Tilt className="tilter">
      <Card sx={{ background: "#6c6c6c", borderRadius: "15px", width: 345, minHeight: 200, maxHeight: 600, cursor: "pointer" }}
        onClick={() => { navigate('/ImgPage', { state: { imgP: props.imgP, imgT: props.imgT, imgD: props.imgD, imgPh: props.imgPh,
        imgE: props.imgE, imgData: props.imgData } }) }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.imgP}
            alt="Clothes Pic"
            loading='lazy'
            sx={customSX}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Roboto', color: "white" }}>
              {props.imgT}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Roboto', color: "white" }}>
              {props.imgD}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Roboto', color: "white" }}>
              Email: {props.imgE}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Roboto', color: "white" }}>
              Phone number: {props.imgPh}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tilt>
  );
}
