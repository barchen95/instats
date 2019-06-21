import React, { Component } from "react";

import { MatchPage } from "./MatchPage";
import LabelBottomNavigation from "./BottomNavigatior/BottomNavigator";
export class MainPage extends Component {
  render() {
    return (
      <div style={{ width: 500 }}>
        {/* <Router history={history}>
          <div>
            <PrivateRoute exact path="/" component={MatchPage} />
            <Route path="/match" component={MatchPage} />
            <Route path="/profile" component={MatchPage} />
          </div>
        </Router> */}

        <MatchPage />
        <LabelBottomNavigation />
      </div>
    );
  }
}
