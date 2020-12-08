import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import {DropzoneArea} from 'material-ui-dropzone'
import axios from 'axios'
import { useStore } from '../../store';

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
      }
  }))
export default function UpdateUser () {
    const [{auth}] = useStore()
    const classes = useStyles()
    const [data,setData] = React.useState(null)
    const [email,setEmail] = React.useState(null)
    const [img,setImg] = React.useState(null)
    const { register, handleSubmit ,reset} = useForm();
    const form_data =  new FormData()

    const onSubmit = async (data) => {
        form_data.append("Phone",data.Phone)
        form_data.append("firstName",data.firstName)
        form_data.append("LastName",data.LastName)
        form_data.append("Userimage",img[0])
        setEmail(data.email)
        setData(form_data)
      }

    React.useEffect(()=>{
      if(data!==null && email!==null){
        axios({method:'patch',url:`http://localhost:9000/api/user`,data:data,headers: {'Content-Type': 'multipart/form-data','Authorization': `Bearer ${auth.user.idToken}`}})
        .then(res=>{
          alert('Updated')
          reset() 
        }).catch(err=>console.log(err))
      }

    },[data,email])

    return (
        <React.Fragment>
          <Typography variant="h3" gutterBottom style={{justifyContent:'center',textAlign:'center',fontFamily:'Roboto'}}>
            Update UserDetails
          </Typography>
          <form  onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}
          className={classes.Grid}
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
            <input className={classes.Input} placeholder='First Name' name="firstName" ref={register({ maxLength: 20 })} />
            </Grid>
            <Grid item xs={12} sm={5}>
            <input className={classes.Input} placeholder="Last Name" name="LastName" ref={register({  maxLength: 20 })} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <input className={classes.Input} placeholder="Phone" name="Phone" ref={register({ maxLength: 10 , pattern: /[2-9]{2}\d{8}/i })} />
            </Grid>    
            <Grid item xs={12}>                
            <Button className={classes.Submit} type="submit"variant="contained" style={{textAlign:'center'}} >
             UPDATE USER
            </Button>
            </Grid>
          </Grid>
          </form>
        </React.Fragment>
    )
}