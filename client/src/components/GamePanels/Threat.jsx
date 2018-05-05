import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Threat extends Component {

  render() {
    return (
      <div>
        There will soon be a threat sheet located here.
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

export default connect(mapStateToProps)(Threat);