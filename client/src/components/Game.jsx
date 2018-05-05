import React, { Component } from 'react';
import { connect } from 'react-redux';
import Investigator from './GamePanels/Investigator.jsx';
import TextLog from './GamePanels/TextLog.jsx';
import Threat from './GamePanels/Threat.jsx';

class GameDisplay extends Component {
  render() {
    return (
      <div>
        {this.props.currentGame ? (
          <div>
            <Investigator />
            <TextLog />
            <Threat />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentGame: state.currentGame,
  };
};

export default connect(mapStateToProps)(GameDisplay);