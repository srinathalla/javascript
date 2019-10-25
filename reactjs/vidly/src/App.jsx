import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movies";
import Customer from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieform";
import LoginForm from "./components/loginform";
import Logout from "./components/logout";
import RegisterForm from "./components/registerform";
import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customer}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
