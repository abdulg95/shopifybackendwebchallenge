import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";
import classnames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/gallery");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();

const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    
    this.props.registerUser(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
return (
    <div className="auth-wrapper">
    <div className="auth-inner">
    <form noValidate onSubmit={this.onSubmit}>
        <h3>Sign Up</h3>              
        <div className="form-group">
            <label>Full Name</label>
            <input 
                type="text"
                onChange={this.onChange}
                value={this.state.name}
                id="name"
                className={classnames("form-control", {
                    invalid: errors.name
                  })}
                placeholder="Name" />
                <span className="red-text">{errors.name}</span>
        </div>                                 

        <div className="form-group">
            <label>Email address</label>
            <input
                 type="email"
                 onChange={this.onChange}
                 value={this.state.email}
                 error={errors.email}
                 id="email"
                 className={classnames("form-control", {
                    invalid: errors.email
                  })}
                 placeholder="Enter email" />
                 <span className="red-text">{errors.email}</span>
        </div>                   

        <div className="form-group">
            <label>Password</label>
            <input
                 type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  className={classnames("form-control", {
                    invalid: errors.password
                  })}
                  id="password"
                  placeholder="Enter password" />
                  <span className="red-text">{errors.password}</span>
        </div>

        <div className="form-group">
            <label>Confirm Password</label>
            <input
                 type="password"
                 className={classnames("form-control", {
                    invalid: errors.password2
                  })}
                 onChange={this.onChange}
                 value={this.state.password2}
                 error={errors.password2}
                 id="password2"
                 placeholder="Enter password" />
                  <span className="red-text">{errors.password2}</span>
        </div>                            

        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        <p className="forgot-password text-right">
            Already have an account? <Link to="/login">Log in</Link>
        </p>                   
    </form>
    </div>
 </div>
    );
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));

