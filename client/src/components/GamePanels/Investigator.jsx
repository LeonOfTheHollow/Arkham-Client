import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectInvestigator, fetchCurrentGame, fetchUserInfo } from '../../actions';

class Investigator extends Component {

  // handleInvestigatorSelect = async (event) => {
  //   event.preventDefault();
  //   console.log("\n",event.target,"\n");
  //   await this.props.selectInvestigator(this.props.currentPlayer, this.props.currentGame, investigator.job);
  // }

  render() {
    if (this.props.currentPlayer.currentJob === 'None') return (
      <div>
        {
          this.props.currentGame.game.investigators.map((investigator, i) => {
            return (
              <div
                className="investigator-minitile"
                onClick={async () => {
                  await this.props.selectInvestigator(this.props.currentPlayer, this.props.currentGame, investigator.job);
                  await this.props.fetchUserInfo();
                  await this.props.fetchCurrentGame();
                  }
                }
                key={i}
              >
                {investigator.name}
              </div>
            )
          })
        }
      </div>
    );
    else {
      return (
        <div>
          <h4>{this.props.currentInvestigator.name}</h4>
          <p>The {this.props.currentInvestigator.job}</p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  console.log("The entire state received was: \n", state, "\n");
  const uuID = localStorage.getItem('uuID');
  const currentInvestigator = state.currentGame.game.investigators.find(investigator => investigator.job === state.currentUser.currentJob);
  return {
    currentPlayer: state.currentUser,
    currentGame: state.currentGame,
    currentInvestigator: currentInvestigator,
  };
};

export default connect(mapStateToProps, { selectInvestigator, fetchCurrentGame, fetchUserInfo })(Investigator);