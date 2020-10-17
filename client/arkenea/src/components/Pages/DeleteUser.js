import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    Input:{
        width: '90%',
        height: '10px',
        padding: '20px',
        border: 'none',
        borderBottomStyle:'inset'
      
    },
    Submit:{
        padding: '20px',
        width: '20%'            
        },
  }))
export default function DeleteUser() {

    const classes = useStyles()
    const [data,setData] = React.useState(null)
    const { register, handleSubmit ,reset } = useForm();

    const onSubmit = (data) => {
        setData(data.email);
      }

    React.useEffect(()=>{
      if(data!==null){
        axios.delete(`http://localhost:9000/api/user/${data}`)
        .then((response)=> {
          reset()
          response.data.data !== null ? alert("deleted") :alert("UserNOt exists")
        })
        .catch((error)=>{
          // handle error
          alert(error.message);
        }) 
      }
    },[data])

    return (
        <React.Fragment>
          <Typography variant="h3" gutterBottom style={{justifyContent:'center',textAlign:'center',fontFamily:'Roboto'}}>
            Delete User
          </Typography>
          <form  onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}
          className={classes.Grid}
          style={{padding:'20px'}}
          direction="row"
          justify="space-around"
          alignItems="center" >
            <Grid item xs={12}>
            <input className={classes.Input} placeholder="Email Of The User To Be Deleted*" name="email" ref={register({ required: true ,pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })} />
            </Grid>   
            <Grid item xs={12} style={{textAlign:'center'}}>                
            <Button className={classes.Submit} type="submit"variant="contained" color="secondary">
                DELETE USER
            </Button>
            </Grid>
          </Grid>
          </form>
        </React.Fragment>
    )
}