import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducer, { initialState as congressInitialState } from './reducer'

export function initializeStore (initialState = congressInitialState) {
  // return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware, logger))
}
