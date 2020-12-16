import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DicomView from '../Viewer'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({

    UserStudy:{
      borderStyle:'solid',
      borderWidth:'1px',
      borderColor:'black'
    },
    StudyDialog:{

    }
  }))

export default function AlertDialog(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(()=>{
      axios.get(`${props.studyfile}`,{headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET',
        }})
    .then((response)=> {
      // handle success
      console.log(response);
    })
    .catch((error)=>{
      // handle error
      console.log(error);
    })

  },[])

  return (
    <div>
      <Button onClick={handleClickOpen}>
                  <Box className={classes.UserStudy} m={2} p={1} >
                    <Typography variant="h6"> {props.study_id} </Typography>
                    </Box>
                  </Button>  
      <Dialog
        open={open}
        scroll='body'
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='lg'
      > 
      <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Role</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value={1}>wwwc</MenuItem>
        <MenuItem value={2}>zoom</MenuItem>
        <MenuItem value={2}>pan</MenuItem>
        <MenuItem value={2}>stack scroll</MenuItem>
        <MenuItem value={2}>pan multi touch</MenuItem>
        <MenuItem value={2}>zoom touch pinch</MenuItem>
      </Select>
       </FormControl>
       <DicomView/>
      </Dialog>
    </div>
  );
}