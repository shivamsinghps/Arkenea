import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormRow from '../UI/UsersItem'
import axios from 'axios'
import Loading from '../UI/Spinner'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 300,
      marginLeft:'auto',
      marginRight:'auto'
    },
    Gridroot: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    Details:{
        marginLeft:'30vw'
    }
  }))
  
export default function Users(props) {
    const classes = useStyles();
    const [loading,setLoading] = React.useState(true)
    const [data,setData] = React.useState(null)

    React.useEffect(()=>{
      const ac = new AbortController();
      axios.get('http://localhost:9000/api/users')
      .then((response)=> {
        setData(response.data.data)
        setLoading(false)
      })
      .catch((error)=>{
        // handle error
        console.log(error);
      })
      return () => ac.abort();

    },[])
    
    if(!loading && data !== null){
      return (
        <React.Fragment>
        <div className={classes.root}>
        <Typography style={{fontFamily:'Roboto'}} variant="h2" gutterBottom>
         UsersList
        </Typography>
        </div>
        <div className={classes.Gridroot}>
            <Grid container spacing={1}>
                {data.map((item,i)=>(
                    <Grid container key={i} item xs={12} spacing={3} className={classes.Details}>
                    <FormRow item={item} {...props} />
                    </Grid>
                ))}
            </Grid>
        </div>
        </React.Fragment>
    )
    }
    else{
      return <Loading/>
    }
}
