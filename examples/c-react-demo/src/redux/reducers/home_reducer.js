import { combineReducers } from 'redux';
import * as ACTIONS from '../actions/home_action';

var loadingStatus = function(state = false, action){
  switch (action.type) {
    case ACTIONS.SET_LOADING_STATUS:
      return action.loadingStatus;
    default:
      return state;
  }
}

var helloResult = function(state = null, action) {
  switch (action.type) {
    case ACTIONS.SET_HELLO_RESULT:
      return action.helloResult;
    default:
      return state;
  }
}

const homeReducer = combineReducers({
    loadingStatus,
    helloResult
})

export default homeReducer;
