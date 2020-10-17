import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    margin:100,
    boxSizing:'border-box'
  },
  media: {
    height: 440,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`http://localhost:9000/${props.profile}`}
          title={props.fname}
        />
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
