import React from "react";
import { connect } from "react-redux";
export const AnalyticsComponent = props => {
  debugger;
  if (props.matches) return <div>{props.matches.length}</div>;

  return <div />;
};

function mapStateToProps(state) {
  const { matches } = state.currentSession.courtPlayers;
  return {
    matches
  };
}

export const Analytics = connect(
  mapStateToProps,
  null
)(AnalyticsComponent);
