import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectInvestigator } from '../../actions';

class Investigator extends Component {

  render() {
    console.log(`investigators: ${this.props.currentGame.game.investigators[0].name}\n`);
    return (
      <div>
        {
          this.props.currentGame.game.investigators.map(investigator => {
            return (
              <div
                className="investigator-minitile"
                onClick={() => {
                  this.props.selectInvestigator(this.props.currentPlayer, this.props.currentGame, investigator.job)
                }}
              >
                {investigator.name}
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("The entire state received was: \n", state, "\n");
  return {
    currentPlayer: state.currentUser,
    currentGame: state.currentGame,
  };
};

export default connect(mapStateToProps, { selectInvestigator })(Investigator);