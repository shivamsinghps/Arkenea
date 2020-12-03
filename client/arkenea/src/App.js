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

function App() {
  return (
    <React.Fragment>
      <SideDrawer />
      <Suspense fallback={<Spinner/>}>
      <Switch>
        <Route path='/User/:id' exact component={UserDetails} />
        <Route path='/Users' exact component={UsersList} />
        <Route path='/ProfileSetup' exact component={UserSetup} />
        <Route path='/DelUser' exact component={DeleteUser} />
        <Route path='/Update' exact component={UpdateUser} />
        <Route path='/UploadStudies' exact component={UploadStudies} />
        <Route path='/' exact component={UsersList} />
        <Redirect to='/' />
      </Switch>
      </Suspense>
    </React.Fragment>
  );
}

export default withRouter(App);
