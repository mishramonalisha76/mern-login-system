import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
     
      padding:"5em",
      
      
    },
    head: {
      color: '#CEF0D4',
       fontFamily: 'Rouge Script',
        fontSize: "3em",
       fontWeight: 'normal'
     
    },
     grid: { 
     
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
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
  }));
function SimpleContainer() {
    const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#d1c4e9', height: '100vh' }} >
 
        <div className={classes.root}>
        <Grid container spacing={12} direction="column" alignItems="center" justify="center">
        <Grid item lg={12} md={6} sm={6} className={classes.grid}>
          <h1 className={classes.head}>Mern Login System</h1>
        </Grid >
        <Grid item lg={12} md={6} sm={6} className={classes.grid} >
          <Grid container spacing ={6} >
        <Grid item lg={6} md={6} sm={12}>
        <Button variant="contained" href="/register" className={classes.button}>
        Register
      </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={12} >
        <Button variant="contained" href="/login" className={classes.button}>
        Login
      </Button>
        </Grid>
        </Grid>
        </Grid> 
      </Grid>
    </div>



            </Typography>
 
      </Container>
    </React.Fragment>
  );
}

export default SimpleContainer;
