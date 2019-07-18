import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { alertActions } from "Actions";
import { MainRouter } from "../Components/Routing";
import { history } from "Helpers";
import Snackbars from "../Components/General/Snackbars";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        <div>
          <div style={{ display: "flex", height: "100%" }}>
            {alert.message && (
              <Snackbars message={alert.message} variant="error" />
            )}

            <MainRouter />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
