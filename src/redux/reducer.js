import * as types from './actionTypes';

const initialState = {
  status: null,
};

export default function common(state = initialState, action = {}) {

  switch (action.type) {
    case types.RECEIVED_NOTIFICATION:
      return {
        ...state,
        status: types.RECEIVED_NOTIFICATION,
        notification: action.notification,
      };
    case types.CHANGE_FAVORITE_STATE:
      return{
        ...state,
        status: types.CHANGE_FAVORITE_STATE,
        favoriteId: action.favoriteId,
      };

    default:
      return state;
  }
}
