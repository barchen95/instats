import React, { Component } from "react";
import Timer from "react-compound-timer";
import { EndMatchModal } from "./EndMatchModal";
import { ActionButtons } from "./StartPauseButton";
import TimeDisplay from "./TimeDisplay";
import Card from "@material-ui/core/Card";
import { currentMatchActions } from "Actions/currentMatchActions";
import { connect } from "react-redux";
import { matchStatusConstants } from "Constants";
class StopWatchComponent extends Component {
  audio = new Audio(
    "https://freesound.org/data/previews/250/250629_4486188-lq.mp3"
  );
  updateTime = time => {
    const { dispatch } = this.props;
    dispatch(currentMatchActions.updateTime(time));
  };
  gameStart = () => {
    if (this.props.matchStatus === matchStatusConstants.WAIT_TO_START) {
      const { dispatch } = this.props;

      dispatch(
        currentMatchActions.updateStatus(matchStatusConstants.REGULAR_TIME)
      );
    }
  };
  extraTime = (setTime, start) => {
    if (this.props.matchStatus !== matchStatusConstants.EXTRA_TIME_STARTED) {
      const { dispatch } = this.props;

      dispatch(currentMatchActions.startExtraTime());
      dispatch(
        currentMatchActions.updateStatus(
          matchStatusConstants.EXTRA_TIME_STARTED
        )
      );

      setTime(15000 / 2);
      start();
    }
  };
  onMatchEnd = () => {
    const { dispatch } = this.props;

    dispatch(
      currentMatchActions.updateStatus(matchStatusConstants.SHOW_MATCH_SUMMRY)
    );
  };
  onTimeEnd = () => {
    const { dispatch } = this.props;
    dispatch(currentMatchActions.onGameEnd());
  };
  togglePlay = () => {
    this.audio.play();
  };
  state = {
    showExtraTime: false
  };

  render() {
    return (
      <div style={{ verticalAlign: "center", marginTop: "20px" }}>
        <div>{this.props.matchStatus}</div>
        <Timer
          initialTime={5000}
          startImmediately={false}
          direction="backward"
          checkpoints={[
            {
              time: 4000,
              callback: () => this.gameStart()
            },
            {
              time: 0,
              callback: () => this.onTimeEnd()
            }
          ]}
        >
          {({
            start,
            resume,
            pause,
            stop,
            reset,
            getTimerState,
            getTime,

            setTime
          }) => (
            <Card>
              {this.updateTime(getTime())}
              {this.props.matchStatus === matchStatusConstants.EXTRA_TIME
                ? this.extraTime(setTime, start)
                : null}
              <div>
                <TimeDisplay>
                  <Timer.Minutes
                    key="minutes"
                    formatValue={value => `${value < 10 ? `0${value}` : value}`}
                  />
                  <Timer.Seconds
                    key="seconds"
                    formatValue={value => `${value < 10 ? `0${value}` : value}`}
                  />
                </TimeDisplay>
              </div>
              <div />
              <br />
              <div>
                <ActionButtons
                  onStart={start}
                  onPause={pause}
                  onEndMatch={e => this.onMatchEnd()}
                  onPenalties={e => {}}
                  showPenalties={
                    this.props.matchStatus ===
                    matchStatusConstants.SHOW_PENALTIES
                  }
                  showEndMatch={
                    this.props.matchStatus ===
                    matchStatusConstants.SHOW_END_MATCH
                  }
                />
              </div>
            </Card>
          )}
        </Timer>
        {this.props.matchStatus === matchStatusConstants.SHOW_MATCH_SUMMRY && (
          <EndMatchModal
            open={
              this.props.matchStatus === matchStatusConstants.SHOW_MATCH_SUMMRY
            }
          />
        )}
      </div>
    );
  }
}

function mapStateToProps({ currentMatch }) {
  const { teams } = currentMatch.teams;
  const homeScore = currentMatch.score.currentScore[0];
  const awayScore = currentMatch.score.currentScore[1];
  const matchStatus = currentMatch.matchStatus;
  return {
    teams,
    homeScore,
    awayScore,
    matchStatus
  };
}

export const StopWatch = connect(
  mapStateToProps,
  null
)(StopWatchComponent);
