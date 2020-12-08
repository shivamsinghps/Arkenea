import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Menu} from '@material-ui/icons';
import {Button,Drawer} from '@material-ui/core';
import SideList from './List/List'

const useStyles = makeStyles((theme) => ({

  list: {
    width: '15vw',
    [theme.breakpoints.down('sm')]: {
      width:'58vw',
    },
  },
  follow:{
    marginLeft:'5vw',
    width:'150px',
    position:'fixed',
    bottom:'50px',
    padding:'10px',
  },
  paper: {
  background: "#d2f5e3"
},
  ToggleBtnColor: {
    color: theme.palette.primary.contrastText
  },
  Menu:{
    zIndex: 500,
    position:'fixed',
    top:20,
    left:20,
    display: 'inline',
  }
}));

const SideDrawer=(props)=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let primarylinks=['Users','DelUser','Update','UploadStudies']
  
  const toggleDrawer = () => {
    setOpen(prev =>!prev);
  };

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}>
      <SideList links={primarylinks} />
    </div>
  );

  return (
        <React.Fragment>
          <div className={classes.Menu}>
            <Button onClick={toggleDrawer}><Menu color='primary' /></Button>
          </div>
          <Drawer transitionDuration={600}  classes={{ paper: classes.paper }} anchor='left'  open={open} onClose={toggleDrawer}>
              {list}
          </Drawer>
        </React.Fragment>
  );
}
export default SideDrawer