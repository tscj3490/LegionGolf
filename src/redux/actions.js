import * as types from './actionTypes';

export function receivedNotification(notification){
  return dispatch =>{
    dispatch({type:types.RECEIVED_NOTIFICATION, notification:notification});
  }
}

export function changeFavoriteState(favoriteId){
  return dispatch =>{
    dispatch({type:types.CHANGE_FAVORITE_STATE, favoriteId:favoriteId})
  }
}
