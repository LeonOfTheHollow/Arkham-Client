import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class TextLog extends Component {

  render() {
    return (
      <div>
        The TextLog will go here
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("The entire state received was: \n", state, "\n");
  return {
    currentPlayer: state.currentPlayer,
    currentGame: state.currentGame,
  };
};

export default connect(mapStateToProps)(TextLog);