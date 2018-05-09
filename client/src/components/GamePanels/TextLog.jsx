import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { takeAction, fetchCurrentGame } from '../../actions/index';

class TextLog extends Component {

  async componentDidMount() {
    const uuID = localStorage.getItem('uuID');
    await this.props.fetchCurrentGame(uuID);
  }

  async handleContextBtnPress(type, payload) {
    const res = await this.props.takeAction(this.props.currentGame._id, {
      type,
      payload,
      player: this.props.currentPlayer._id,
    });
    console.log("Response from server from pressing button: ", res);
  }

  render() {
    return (
      <div>
        {this.props.currentInvestigator ? 
          <div className="Choices-Window">
            <div className="Choices-Window__Narration">
              {this.props.currentInvestigator.clientState ? this.props.currentInvestigator.clientState.narration : "Loading..."}
            </div>
            {this.props.currentInvestigator.clientState ?
              <div className="Choices-Window__Context-Buttons">
                {
                  this.props.currentInvestigator.clientState.contextButtons.map(contextButton => {
                    return (
                      <button onClick={async () => {
                        await this.handleContextBtnPress(contextButton.type, contextButton.payload);
                        await this.props.fetchCurrentGame();
                        }
                      }>
                        {contextButton.text}
                      </button>
                      );
                    })
                }
              </div>
            : "Loading..."}
          </div>
        : null}
      </div>
    )
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

export default connect(mapStateToProps, { takeAction, fetchCurrentGame })(TextLog);