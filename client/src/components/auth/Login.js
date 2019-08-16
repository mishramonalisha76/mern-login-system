import React,{Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';


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

  class Login extends Component {
     
    constructor(){
        super();
        this.state = {
         
          email: "",
          password: "",
          
          errors: {}
        };
      }
      
      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard"); 
        }
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
    
            const userData = {
                
                email: this.state.email,
                password: this.state.password,
               

              };
              this.props.loginUser(userData); 
          console.log(userData);
            };
    render (){
        const { errors } = this.state;
        // const classes = styles();
    return (
        <form noValidate onSubmit={this.onSubmit}>
         
          <TextField
           id="email"
           label="Email"
          //  className={classes.textField}
           value={this.state.email}
           onChange={this.onChange}
           error={errors.email}
           className={classnames("", {
            invalid: errors.email || errors.emailnotfound
          })}
           margin="normal"
          />
          <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
          <TextField
           id="password"
           label="Password"
          //  className={classes.textField}
           value={this.state.password}
           onChange={this.onChange}
           error={errors.password}
           className={classnames("", {
            invalid: errors.password || errors.passwordincorrect
          })}
           margin="normal"
          />
          <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
          <button type="submit" >Submit</button>
          </form>
  );
}
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));