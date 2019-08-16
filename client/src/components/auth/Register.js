import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    // textField: {
    //   marginLeft: theme.spacing(1),
    //   marginRight: theme.spacing(1),
    //   width: 200,
    // },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    }
  });

  class Register extends Component {
     
    constructor(){
        super();
        this.state = {
          name: "",
          email: "",
          password: "",
          password2: "",
          phone: "",
          gender: "",
          errors: {}
        };
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
                password2: this.state.password2,
                phone: this.state.phone,
                gender: this.state.gender

              };
              this.props.registerUser(newUser, this.props.history); 
          console.log(newUser);
            };
    render (){
      // const {classes}  = styles();
      const { errors } = this.state;
    return (
        <form  noValidate onSubmit={this.onSubmit}>
          <TextField
            id="name"
            label="Name"
            // className={classes.textField}
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            className={classnames("", {
              invalid: errors.email
            })}
            margin="normal"
          />
          <span className="red-text">{errors.name}</span>
          <TextField
           id="email"
           label="Email"
          //  className={classes.textField}
           value={this.state.email}
           onChange={this.onChange}
           error={errors.email}
           className={classnames("", {
            invalid: errors.email
          })}
           margin="normal"
          />
          <span className="red-text">{errors.email}</span>
          <TextField
           id="password"
           label="Password"
          //  className={classes.textField}
           value={this.state.password}
           onChange={this.onChange}
           error={errors.password}
           className={classnames("", {
            invalid: errors.password
          })}
           margin="normal"
          />
           <span className="red-text">{errors.password}</span>
          <TextField
           id="password2"
           label="Confirm password"
          //  className={classes.textField}
           value={this.state.password2}
           onChange={this.onChange}
           error={errors.password2}
           className={classnames("", {
            invalid: errors.password2
          })}
           margin="normal"
          />
          <span className="red-text">{errors.password2}</span>
           <TextField
            id="phone"
            label="Phone"
            // className={classes.textField}
            value={this.state.phone}
            onChange={this.onChange}
            error={errors.phone}
            className={classnames("", {
              invalid: errors.phone
            })}
            margin="normal"
          />
          <span className="red-text">{errors.phone}</span>
           <TextField
            id="gender"
            label="Gender"
            // className={classes.textField}
            value={this.state.gender}
            onChange={this.onChange}
            
            margin="normal"
          />

           <button  type="submit" >Submit</button>
          </form>
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
)(withRouter (withStyles(styles)(Register)));