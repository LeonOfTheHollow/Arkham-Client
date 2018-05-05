import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { joinGame, fetchCurrentGame, fetchAllGames, buildGame } from '../actions';
import GameDisplay from './Game';
import Matchmaker from './Matchmaking';

class Dashboard extends Component {

  async componentDidMount() {
    const uuID = localStorage.getItem('uuID');
  }

  render(){
    console.log("At the time of this render, props on Dashboard are: ", this.props, '\n');
    if (!this.props.currentGame) {
      return <Matchmaker />
    } else {
      return <GameDisplay />
    }
  }
}

const mapStateToProps = state => {
  return {
    authed: state.authed,
    currentGame: state.currentGame,
  }
}

export default connect(mapStateToProps, { joinGame, fetchCurrentGame, fetchAllGames, buildGame })(Dashboard);