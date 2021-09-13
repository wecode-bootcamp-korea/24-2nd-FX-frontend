import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./Component/Nav";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";
import Drama from "./Drama/Drama";
import Movie from "./Movie/Movie";
import Footer from "./Component/Footer";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Main} />
          <Route exact path="/drama" component={Drama} />
          <Route exact path="/movie" component={Movie} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
