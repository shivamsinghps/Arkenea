import React from 'react'
import UserCard from '../UI/UserDetailsCard'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Loading from '../UI/Spinner'

export default function UserDetails(props) {

    const id = props.location.pathname.substring(6)
    const [loading,setLoading] = React.useState(true)
    const [data,setData] = React.useState(null)
    React.useEffect(()=>{
        axios.get(`http://localhost:9000/api/user/${id}`)
      .then((response)=> {
        // handle success
        setData(response.data.data)
        setLoading(false)
      })
      .catch((error)=>{
        // handle error
        console.log(error);
      })

    },[id])

    if(!loading && data !== null){
    return (
       <React.Fragment>
        <Typography variant="h3" gutterBottom style={{justifyContent:'center',textAlign:'center',fontFamily:'Roboto'}}>
            User Detail
        </Typography>
        <Grid container spacing={2}
          direction="row"
          justify="center"
          alignItems="center" >
            <Grid item xs={12}>
                <UserCard fname={data.firstName} lname={data.LastName} phone={data.Phone} email={data.email} image={data.image} imagePublicId={data.imagePublicId} />
            </Grid>
        </Grid>
       </React.Fragment>
    )}
    else
    return <Loading />
}
