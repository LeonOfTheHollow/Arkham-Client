const axios = require("axios");

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const GAME_RETRIEVED = "GAME_RETRIEVED";
export const ALL_GAMES_RETRIEVED = "ALL_GAMES_RETRIEVED";
export const SELECTED_INVESTIGATOR = "SELECTED_INVESTIGATOR";

const ROOT_URL = "http://localhost:5050";

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await axios.post(`${ROOT_URL}/login`, { username, password });
      const uuID = user.data._id;
      localStorage.setItem("uuID", uuID);
      if (user) dispatch({ 
        type: LOGIN_SUCCESS,
        payload: user,
      });
      else dispatch({ type: LOGIN_FAILURE });
    } catch(e) {
      console.log("Problem logging in: ", e);
      dispatch({ type: LOGIN_FAILURE });
    }
  };
};

export const register = (username, password, confirmPassword) => {
  return async dispatch => {
    try {
      const newUser = await axios.post(`${ROOT_URL}/register`, { username, password });
    } catch(e) {
      console.log("There was a problem registering: ", e);
    }
  };
};

export const buildGame = (size) => {
  return async dispatch => {
    try {
      const newGame = await axios.post(`${ROOT_URL}/new-game`, { gameSize: size });
      console.log("Built a game: ", newGame);
    } catch(e) {
      console.log("There was a problem building the game: ", e);
    }
  }
}

export const joinGame = (gameId) => {
  const userId = localStorage.getItem('uuID');
  console.log("Making POST request to join game ID: ", gameId, "\n");
  return async dispatch => {
    try {
      const joinedGame = await axios.post(`${ROOT_URL}/join-game`, { userId, gameId });
      console.log("Joined a game:", joinedGame);
    } catch(e) {
      console.log("There was a problem joining a game: ", e)
    }
  }
}

export const fetchCurrentGame = () => {
  const uuID = localStorage.getItem('uuID');
  return async dispatch => {
    try {
      console.log("Axios will make a request with this ID as param: ", uuID);
      const currentGame = await axios.get(`${ROOT_URL}/games/${uuID}`);
      if (currentGame) dispatch({
        type: GAME_RETRIEVED,
        payload: {
          currentGame,
        },
      })
    } catch(e) {
      console.log("There was a problem with the populate action: ", e);
    }
  }
}


export const fetchAllGames = () => {
  console.log("Trying to fetch all games.\n");
  return async dispatch => {
    try {
      console.log("About to request all games.\n");
      const allGames = await axios.get(`${ROOT_URL}/games/all`);
      console.log("Received game list from the server:\n", allGames);
      const gameIds = allGames.data.map(game => game._id);
      if (allGames) dispatch({
        type: ALL_GAMES_RETRIEVED,
        payload: {
          gameIds,
        },
      });
    } catch(e) {
      console.log("There was an error with the request to /games/all: ", e);
    }
  }
}

export const selectInvestigator = (userId, gameId, jobToClaim) => {
  return async dispatch => {
    try {
      console.log(`About to make request to claim character with: ${userId}, ${gameId}, ${jobToClaim}\n`)
      await axios.post(`${ROOT_URL}/claim-investigator`, { userId, gameId, jobToClaim })
    } catch(e) {
      console.log(`\nProblem selecting investigator: ${e}\n`);
    }
  }
}