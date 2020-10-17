import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom'

const useStyles = makeStyles({

  text:{
    color:'black'
  }

});

const SideList = (props) => {

const classes = useStyles();
  return(
    <List>
      {props.links.map((text, index) => {
        const link = '/'+text
        return(
        <NavLink to={link} exact style={{ textDecoration: 'none' }} key={index}>
        <ListItem button >
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
         <ListItemText classes={{ root: classes.text }} primary={text} />
         </ListItem>
         </NavLink>
      )})}
    </List>
  )
}
export default SideList