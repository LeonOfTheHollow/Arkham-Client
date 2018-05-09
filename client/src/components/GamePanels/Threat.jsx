import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Threat extends Component {
  render() {
    console.log(this.props.currentGame.game);
    const clientState = this.props.currentInvestigator ? this.props.currentGame.game.investigators.find(investigator => {
      console.log("About to compare:", investigator.job);
      console.log("To:", this.props.currentInvestigator.job);
      if (investigator.job === this.props.currentInvestigator.job) {
        console.log("Found this client's state:", investigator.clientState);
        return investigator;
      };
    }).clientState : null;
    if (!clientState) {
      return (
        <div>
          No client state yet provided.
        </div>
      )
    } 
    console.log("About to use this clientState to render the Threat panel:", clientState.view_type);
    switch(clientState.view_type) {
      case 'SETUP':
        return (
          <div>
            {this.props.currentGame.game.oldOne.name}
          </div>
        );
      case 'UPKEEP':
        return (
          <div>
            {this.props.currentInvestigator.location}
          </div>
        );
      default:
        return (
          <div>
            No client view found.
          </div>
        )
    }
  }
}

const mapStateToProps = state => {
  console.log("The entire state received was: \n", state, "\n");
  const currentInvestigator = state.currentGame.game.investigators.find(investigator => investigator.job === state.currentUser.currentJob);
  return {
    currentPlayer: state.currentUser,
    currentGame: state.currentGame,
    currentInvestigator: currentInvestigator,
  };
};

export default connect(mapStateToProps)(Threat);