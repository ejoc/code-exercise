import { combineReducers } from 'redux'
import {
  CONGRESS_PERSON_REQUEST,
  CONGRESS_PERSON_SUCCESS,
  CONGRESS_PERSON_FAILURE,
} from '../actions/congressPerson'

export const initialState = {
  isFetching: false,
  congressPerson: {},
}

const congressPerson = (state = initialState.congressPerson, action) => {
  switch(action.type) {
    case CONGRESS_PERSON_SUCCESS:
      return {
        ...state,
        [action.id]: action.response,
      }
    // case CONGRESS_PERSON_FAILURE:
    default:
      return state
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case CONGRESS_PERSON_REQUEST:
      return true
    case CONGRESS_PERSON_SUCCESS:
    case CONGRESS_PERSON_FAILURE:
      return false
    default:
      return state
  }
}

// Selectors
export const getIsFetching = state => state.congressPersonStore.isFetching

export const getCongressPerson = (state, id) => state.congressPersonStore.congressPerson[id]

export default combineReducers({
  congressPerson,
  isFetching,
})