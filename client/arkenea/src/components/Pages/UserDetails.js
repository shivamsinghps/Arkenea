import React from 'react'
import UserCard from '../UI/UserDetailsCard'
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Study from './Studies'
import Loading from '../UI/Spinner'
import { useStore } from '../../store';

const useStyles = makeStyles((theme) => ({

  UserStudy:{
    borderStyle:'solid',
    borderWidth:'1px',
    borderColor:'black'
  }
}))

export default function UserDetails(props) {
    const [{auth}] = useStore()
    const classes = useStyles()
    const [loading,setLoading] = React.useState(true)
    const [data,setData] = React.useState(null)
    const [shareddata,setSharedData] = React.useState([])
    React.useEffect(()=>{
      console.log(auth);
        axios.get(`http://localhost:9000/api/user`,{headers: {
          'Authorization': `Bearer ${auth.user.idToken}`
        }})
      .then((response)=> {
        console.log(response)
        // handle success
        // console.log(response.data.data.studies[0].studyfile);
        setData(response.data.data)
        setSharedData(response.data.shared_data)
        setLoading(false)
      })
      .catch((error)=>{
        // handle error
        console.log(error);
      })

    },[])

    // console.log(data.image);
    console.log(shareddata,"this is it");

    if(!loading && data !== null){
    return (
       <React.Fragment>
        <Typography variant="h3" gutterBottom style={{justifyContent:'center',textAlign:'center',fontFamily:'Roboto'}}>
            User Detail
        </Typography>
        <Grid container spacing={1}
          direction="row"
          justify="center"
          alignItems="flex-start" >
            {console.log(data)}
            <Grid item xs={8} sm={4} md={4}style={{justifyContent:'center'}}>
                <UserCard fname={data.firstName} lname={data.LastName} phone={data.Phone} email={data.email} image={data.image} imagePublicId={data.imagePublicId} />
            </Grid>
            <Grid item xs={10} sm={8} md={6} >
            <Typography variant="h5" gutterBottom style={{justifyContent:'center',textAlign:'left',fontFamily:'Roboto',marginTop:50}}>
             User Studies
             </Typography>
                {data.studies.map(study=>(
                  <Study study_id={study._id} key={study._id} studyfile={study.studyfile}/>
                ))}
            </Grid> 
           {shareddata!==null && shareddata.length!==0 ?( <Grid item xs={10} sm={8} md={6} >
            <Typography variant="h5" gutterBottom style={{justifyContent:'center',textAlign:'left',fontFamily:'Roboto',marginTop:50}}>
             Shared Studies
             </Typography>
                {shareddata.map(study=>(
                  <Study study_id={study._id} key={study._id} studyfile={study.studyfile}/>
                ))}
            </Grid> 
            ):null}
        </Grid>
       </React.Fragment>
    )}
    else
    return <Loading />
}
