import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))

export default function UsersItem(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
        <Grid item xs={6}>
        <Paper className={classes.paper} onClick={()=>props.history.push(`/User/${props.item.email}`)}>Name:{props.item.firstName + props.item.LastName}, Email:{props.item.email}</Paper>
        </Grid>
      </React.Fragment>
    )
}
