import React ,{ Suspense } from 'react';
import './App.css';
import { Route , Switch , Redirect ,withRouter} from 'react-router-dom'
import DeleteUser from './components/Pages/DeleteUser'
import UpdateUser from './components/Pages/UpdateUser'
import UserDetails from './components/Pages/UserDetails'
import UsersList from './components/Pages/Users'
import UserSetup from './components/Pages/UserSetup'
import SideDrawer from './components/UI/SideDrawer';
import Spinner from './components/UI/Spinner'
import UploadStudies from './components/Pages/UploadStudies';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import {useStore} from './store'


function App() {
  const [{ auth }] = useStore();
  console.log(auth);
  let routes = (
  <React.Fragment >
    <SideDrawer />
    <Suspense fallback={<Spinner/>}>
    <Switch>
      <Route path='/User/:id' exact component={UserDetails} />
      {/* <Route path='/Users' exact component={UsersList} /> */}
      {/* <Route path='/ProfileSetup' exact component={UserSetup} /> */}
      <Route path='/DelUser' exact component={DeleteUser} />
      <Route path='/signin' exact component={SignIn} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/Update' exact component={UpdateUser} />
      <Route path='/UploadStudies' exact component={UploadStudies} />
      <Route path='/' exact component={UserDetails} />
      <Redirect to='/' />
    </Switch>
    </Suspense>
  </React.Fragment>)
  if(auth.user===null)
   routes = (
    <React.Fragment >
    <Suspense fallback={<Spinner/>}>
    <Switch>
      <Route path='/signin' exact component={SignIn} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/' exact component={SignIn} />
      <Redirect to='/' />
    </Switch>
    </Suspense>
  </React.Fragment>
   )

  return (
    <>
    {routes}
    </>
  );
}

export default withRouter(App);
