// import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import session from 'jdcloudecc/reducer/session';
/**** Common start ****/
import categoryCascade from './redux';
/**** Common end ****/
export default {
  routing: routerReducer,
  session,
  categoryCascade,
}
