import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing:'border-box',
    display:'inline-block'
  },
  media: {
    height: 440,
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    height:'30vh',
    width:'15vw'
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {props.image!==undefined?<CardMedia 
          className={classes.media}
          image={props.image}
          title={props.fname}
          alt={props.imagePublicId}
        />:<Avatar variant="square" className={classes.square}>
        {props.email.split('')[0]}
      </Avatar>}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.fname}  {props.lname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone:{props.phone}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            EmailId:{props.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
