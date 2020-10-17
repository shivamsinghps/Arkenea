import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import {DropzoneArea} from 'material-ui-dropzone'
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
export default function UserSetup() {

    const classes = useStyles()
    const [data,setData] = React.useState(null)
    const [img,setImg] = React.useState(null)
    const { register, handleSubmit,reset} = useForm();
    const form_data =  new FormData()

    const onSubmit = (data) => {
      form_data.append("email",data.email)
      form_data.append("Phone",data.Phone)
      form_data.append("firstName",data.firstName)
      form_data.append("LastName",data.LastName)
      form_data.append("Userimage",img[0])
      setData(form_data)
      }

      React.useEffect(()=>{
        if(data!==null && img!==null){
          axios({method:'post',url:`http://localhost:9000/api/profileSetup`,data:data})
          .then(res=>{
            alert('Created')
            reset() 
          }).catch(err=>console.log(err.message))
        }
  
      },[data,img])

    return (
        <React.Fragment>
          <Typography variant="h3" gutterBottom style={{justifyContent:'center',textAlign:'center',fontFamily:'Roboto'}}>
            Profile Details
          </Typography>
          <form  onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}
          style={{padding:'20px'}}
          direction="row"
          justify="space-around"
          alignItems="center" >
            <Grid item xs={12}>
            <label>ProfileImage</label>
            <DropzoneArea
            onChange={(files)=>setImg(files)}
            />
            </Grid>
            <Grid item xs={12} sm={5}>
            <input className={classes.Input} placeholder='First Name*' name="firstName" ref={register({ required: true, maxLength: 20 })} />
            </Grid>
            <Grid item xs={12} sm={5}>
            <input className={classes.Input} placeholder="Last Name*" name="LastName" ref={register({ required: true, maxLength: 20 })} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <input className={classes.Input} placeholder="Phone*" name="Phone" ref={register({ required: true, maxLength: 10 })} />
            </Grid>    
            <Grid item xs={12} sm={5}>
            <input className={classes.Input} placeholder="Email*" name="email" ref={register({ required: true ,pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })} />
            </Grid>
            <Grid item xs={12}>                
            <Button className={classes.Submit} type="submit"variant="contained" color="primary" style={{textAlign:'center'}}>
              SUBMIT
            </Button>
            </Grid>
          </Grid>
          </form>
        </React.Fragment>
    )
}
