import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles'
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    // border: "1px solid",
    // padding: "10px",
    // clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)"
  },
  shado: {
    borderRadius: "15px",
    // boxShadow: "inset 0px 0px 2px 1px black",
  },
//other styles and classes//
});

export default function MainCard(props) {

  const customSX = {
    transition: "height 400ms ease-in-out",
    // padding: "5px",
    borderRadius: "10px",
    "&:hover": {height: 400},
  };

  const navigate = useNavigate();

  const classes = useStyles();

  return (
    <Card className={classes.root} sx={{ background: "#6c6c6c", borderRadius: "15px", width: 345, minHeight: 200, maxHeight: 600, cursor: "pointer" }} onClick={() => {
      navigate('/ImgPage', {state: {imgP: props.imgP, imgT: props.imgT, imgD: props.imgD, imgPh: props.imgPh, imgE: props.imgE}})}}>
      <CardActionArea className={classes.shado}>
        <CardMedia
          component="img"
          height="140"
          image={props.imgP}
          alt="Clothes Pic"
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
  );
}
