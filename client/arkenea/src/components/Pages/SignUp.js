import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from "react-hook-form";
// import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStore } from '../../store';
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { SET_AUTH_USER } from '../../store/auth';
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },    
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [{auth},dispatch] = useStore();
  const classes = useStyles();
  const { control, handleSubmit, errors ,reset} = useForm();
  const [age, setAge] = React.useState('');
  const [authUser, setAuthUser] = React.useState(null);


  const handleChange = (event) => {
    setAge(event.target.value);
  };

  React.useEffect(() => {
    if(authUser!==null)
    dispatch({ type: SET_AUTH_USER, payload: authUser });
  }, [dispatch, authUser]);

  const onSubmit = data => {
    const auth_init_data ={
			email:data.email,
			password:data.password
    }
    axios.post('http://localhost:9000/api/signup',auth_init_data).then((res) => {
      console.log(res.data);
      setAuthUser(res.data);
  }).catch(err=>console.log(err))
  }

  return (
    <>
     {authUser!==null?<Redirect to='/' />:null}
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Patient</MenuItem>
          <MenuItem value={20}>Doctor</MenuItem>
        </Select>
      </FormControl>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
            as={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            control={control}
            defaultValue=""
          />
          <Controller
            as={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoFocus
            autoComplete="password"
            control={control}
            defaultValue=""
          />
          <Controller
            as={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirm_password"
            label="Confirm Password"
            name="confirm_password"
            type="password"
            autoFocus
            autoComplete="confirm_password"
            control={control}
            defaultValue=""
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        <Link to="/signin">
                {"Already have an account? SignIn"}
              </Link>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}