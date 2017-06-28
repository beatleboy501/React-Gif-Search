import request from 'superagent';
import Firebase from 'firebase';

// Basically creating an Enum of actions we are able to perform
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

// TODO: Hide the info below
const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=200209553d5d4584bc9278e00fdc3aef';

const firebaseConfig = {
  apiKey: "AIzaSyCdJESa4z2Ww6azr4F0q4PabNzvzcMXXUo",
  authDomain: "react-gif-search-7668a.firebaseapp.com",
  databaseURL: "https://react-gif-search-7668a.firebaseio.com",
  projectId: "react-gif-search-7668a",
  storageBucket: "react-gif-search-7668a.appspot.com",
  messagingSenderId: "892420000327"
};

Firebase.initializeApp(firebaseConfig);

// This maps the action strings to the reducer functions

export function requestGifs(term = null) {
  return function(dispatch) {
    // Handle and return the action object rather than returning a promise as the payload val
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response
      });
    });
  }
}

export function fetchFavoritedGifs() {
  return function(dispatch) {
    const user = Firebase.auth().currentUser;
    if(user) {
      const userUid = user.uid;

      // Firebase's `on` method passes our favorited gifs into our Redux store
      // The `on` method is a listener that fires when the initial data is
      // stored at the specified location and again every time the data changes.
      Firebase.database().ref(userUid).on('value', snapshot => {
        dispatch({
          type: FETCH_FAVORITED_GIFS,
          payload: snapshot.val()
        })
      });
    }
  }
}

export function favoriteGif({selectedGif}) {
  const user = Firebase.auth().currentUser;
  if(user){
    const userUid = user.uid;
    const gifId = selectedGif.id;

    return dispatch => Firebase.database().ref(userUid).update({
      [gifId]: selectedGif
    });
  }
}

export function unfavoriteGif({selectedGif}) {
  const user = Firebase.auth().currentUser;
  if(user) {
    const userUid = user.uid;
    const gifId = selectedGif.id;

    return dispatch => Firebase.database().ref(userUid).child(gifId).remove();
  }
}

export function openModal(gif) {
  return {
    type: OPEN_MODAL,
    gif
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(response => {
          dispatch(authUser());
        })
        .catch(error => {
          console.error(error);
          dispatch(authError(error));
        })
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(response => {
          dispatch(authUser());
        })
        .catch(error => {
          dispatch(authError(error));
        });
  }
}

export function signOutUser() {
  return function(dispatch) {
    Firebase.auth().signOut()
        .then(() => {
          dispatch({
            type: SIGN_OUT_USER
          })
        });
  }
}

export function verifyAuth() {
  return function(dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      // Oauth: the user is authenticated if token in local storage is still valid,
      // otherwise have user provide credentials again
      if(user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

// The two responses we can receive from Firebase

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
