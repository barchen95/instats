import { Router, Route } from "react-router-dom";
import { history } from "Helpers";
import { PrivateRoute } from "Components/Routing";
import React from "react";
import BottomNavigator from "./BottomNavigatior/BottomNavigator";
import { makeStyles } from "@material-ui/core/styles";

import {
  MainPage,
  ProfilePage,
  LoginPage,
  MatchPage,
  RegisterPage,
  SessionPage
} from "Components/Pages";

const useStyles = makeStyles(theme => ({
  root: {
    height: "93vh"
  }
}));
export const MainRouter = () => {
  const classes = useStyles();

  return (
    <Router history={history}>
      <div className={classes.root}>
        <PrivateRoute exact path="/" component={MainPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/match" component={SessionPage} />
        <PrivateRoute exact path="/currentMatch" component={MatchPage} />

        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </div>
      <BottomNavigator />
    </Router>
  );
};
