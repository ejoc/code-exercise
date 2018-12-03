import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducers, { initialStates } from './reducers'

export default (initialState = initialStates) => {
  const reducer = combineReducers(reducers)
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware, logger))
}
