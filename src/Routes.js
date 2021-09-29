import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "Pages/Login";
import SignUp from "Pages/SignUp";
import Main from "Pages/Main";
import Genre from "Pages/Genre";
import WishList from "Pages/WishList";
import Nav from "Components/Nav";
import Footer from "Components/Footer";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Main} />
          <Route
            exact
            path="/genre/:genreCategory"
            component={props => <Genre {...props} />}
          />
          <Route exact path="/genre" component={Genre} />
          <Route exact path="/wishlist" component={WishList} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
