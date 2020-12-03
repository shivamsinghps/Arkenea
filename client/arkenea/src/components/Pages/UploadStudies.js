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
      }
  }))
export default function UploadStudies () {

    const classes = useStyles()
    const [data,setData] = React.useState(null)
    const [email,setEmail] = React.useState(null)
    const [img,setImg] = React.useState()
    const { register, handleSubmit ,reset} = useForm();
    const form_data =  new FormData()

    const onSubmit = async (data) => {
        form_data.append("email",data.email)
        console.log(img);
        img.map(item=>{
          form_data.append("Userimage",item)
        })
        setEmail(data.email)
        setData(form_data)
      }

    React.useEffect(()=>{
      if(data!==null && email!==null){
        axios({method:'post',url:`http://localhost:9000/api/upload_studies/${email}`,data:data,headers: {'Content-Type': 'multipart/form-data' }})
        .then(res=>{
          alert('Uploaded')
          reset() 
        }).catch(err=>console.log(err))
      }

    },[data,email])

    return (
        <React.Fragment>
          <Typography variant="h3" gutterBottom style={{justifyContent:'center',textAlign:'center',fontFamily:'Roboto'}}>
            Upload Studies
          </Typography>
          <form  onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}
          className={classes.Grid}
          style={{padding:'20px'}}
          direction="row"
          justify="space-around"
          alignItems="center" >
            <Grid item xs={12}>
            <input className={classes.Input} placeholder="Email Of The User whose study is to be uploaded" name="email" ref={register({ required: true ,pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })} />
            </Grid>
            <Grid item xs={12}>
            <label>Studies</label>
            <DropzoneArea
            acceptedFiles={['application/dicom']}
            onChange={(files)=>setImg(files)}
            />
            </Grid>
            <Grid item xs={12}>                
            <Button className={classes.Submit} type="submit"variant="contained" style={{textAlign:'center'}} >
             UPLOAD STUDIES
            </Button>
            </Grid>
          </Grid>
          </form>
        </React.Fragment>
    )
}