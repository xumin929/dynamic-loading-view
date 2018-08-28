import { combineReducers } from 'redux'
import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
/**** Common start ****/
import categoryCascade from './redux';
/**** Common end ****/
export default combineReducers({
  categoryCascade,
})
