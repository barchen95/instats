import { Router, Route } from "react-router-dom";
import { history } from "Helpers";
import { PrivateRoute } from "Components/Routing";
import React from "react";
import BottomNavigator from "./BottomNavigatior/BottomNavigator";
import {
  MainPage,
  ProfilePage,
  LoginPage,
  MatchPage,
  RegisterPage
} from "Components/Pages";
export const MainRouter = () => {
  return (
    <Router history={history} style={{ height: "90vh" }}>
      <div>
        <PrivateRoute exact path="/" component={MainPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/match" component={MatchPage} />

        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </div>
      <BottomNavigator />
    </Router>
  );
};
