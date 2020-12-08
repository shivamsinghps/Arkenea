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
    React.useEffect(()=>{
      console.log(auth);
        axios.get(`http://localhost:9000/api/user`,{headers: {
          'Authorization': `Bearer ${auth.user.idToken}`
        }})
      .then((response)=> {
        // handle success
        setData(response.data.data)
        setLoading(false)
      })
      .catch((error)=>{
        // handle error
        console.log(error);
      })

    },[])

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
                  <Study study_id={study._id} key={study._id}/>
                ))}
            </Grid> 

        </Grid>
       </React.Fragment>
    )}
    else
    return <Loading />
}
