import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import Gallery from '../components/Gallery';
import NotFoundPage from '../components/NotFoundPage';
import Register from '../components/auth/Register';
import Login from "../components/auth/Login";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/auth";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import store from "../store/store";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
const Content = withRouter(props =>
  <div>
  {(props.location.pathname === '/gallery' ||  props.location.pathname === '/upload')  && <Header />}
  
</div>
);

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Content />
      <div className="main-content">       
        <Switch>  
        <Route component={Register} exact path="/"  />
       <Route exact path="/register" component={Register} />
       <Route exact path="/login" component={Login} />        
          <PrivateRoute exact path="/gallery"component={Gallery}  />
          <PrivateRoute exact path="/upload"component={HomePage}/>          
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;