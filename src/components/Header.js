import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import PropTypes from "prop-types";
class Header extends Component {
   onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render(){
    const { user } = this.props.auth;
    console.log('user',user);
  return(
    <header>
      <h1>Photo Gallery App</h1>
      <div className="links">       
      Signed in as: {user.name}           
        <NavLink to="/upload" className="link">
          Upload
        </NavLink>
        <NavLink to="/gallery" className="link">
          Gallery
        </NavLink>
        <Button 
            type='button'
            onClick={this.onLogoutClick}
            variant="outline-light"
            className="logout-btn"
            >Log Out</Button>
      </div>
    </header>
);
  }
  }
  Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Header);