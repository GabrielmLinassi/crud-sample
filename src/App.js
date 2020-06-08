import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";

import Login from "./components/Login";
import SignupForm from "./components/SignUp";
import Home from "./components/Home";

const App = () => (
  <AuthProvider>
    <Router basename="/">
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignupForm} />
    </Router>
  </AuthProvider>
);

export default App;
