import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DicomView from '../Viewer'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({

    UserStudy:{
      borderStyle:'solid',
      borderWidth:'1px',
      borderColor:'black'
    }
  }))

export default function AlertDialog(props) {
    const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
                  <Box className={classes.UserStudy} m={2} p={1} >
                    <Typography variant="h6"> {props.study_id} </Typography>
                    </Box>
                  </Button>  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
       <DicomView/>
      </Dialog>
    </div>
  );
}