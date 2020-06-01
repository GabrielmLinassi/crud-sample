import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

import Login from "./components/Login";
import SignupForm from "./components/SignUp";
import Home from "./components/Home";

const App = () => (
  <AuthProvider>
    <Router>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignupForm} />
    </Router>
  </AuthProvider>
);

export default App;
