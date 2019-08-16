import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ButtonAppBar from "./components/layout/navbar";
import SimpleContainer from "./components/layout/landing";
 import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import './App.css';

class App extends Component{
   render(){
    return (
     <Provider store={store}>
      <Router>
        <div className="App">
          <ButtonAppBar />
          <Route exact path="/" component={SimpleContainer} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
     </Provider>
    );
    }
}

export default App;
