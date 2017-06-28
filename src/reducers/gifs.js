import {REQUEST_GIFS, FETCH_FAVORITED_GIFS} from '../actions';

const initialState = {
  data: [],
  favorites: []
};

export default function gifs(state = initialState, action) {
  if (action.type === REQUEST_GIFS) {
    return {
      ...state, data: action.payload.body.data
    };
  } else if (action.type === FETCH_FAVORITED_GIFS) {
    let arr = [];
    for (let i in action.payload) {
      if (action.payload.hasOwnProperty(i)) {
        arr.push(action.payload[i]);
      }
    }
    return {
      ...state, favorites: arr
    };
  } else {
    return state;
  }
}
