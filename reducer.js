import { combineReducers } from 'redux'
import {
  FETCH_CONGRESS_REQUEST,
  FETCH_CONGRESS_SUCCESS,
  FETCH_CONGRESS_FAILURE,

  CHANGE_SESSION,
  CHANGE_CHAMBER,
  CHANGE_INPUT_SEARCH,
} from './actions'

export const initialState = {
  isFetching: false,
  congressPeople: {},
  session: 115,
  chamber: 'senate',
  searchText: '',
}

const congressPeople = (state = initialState.congressPeople, action) => {
  switch(action.type) {
    case FETCH_CONGRESS_SUCCESS:
      return {
        ...state,
        [action.session]: {
          ...state[action.session],
          [action.chamber]: action.response,
        },
      }
    // case FETCH_CONGRESS_FAILURE:
    default:
      return state
  }
}

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case FETCH_CONGRESS_REQUEST:
      return true
    case FETCH_CONGRESS_SUCCESS:
    case FETCH_CONGRESS_FAILURE:
      return false
    default:
      return state
  }
}

const sessionReducer = (state = initialState.searchText, action) => {
  switch(action.type) {
    case CHANGE_SESSION:
      return action.session
    default:
      return state
  }
}

const chamberReducer = (state = initialState.chamber, action) => {
  switch(action.type) {
    case CHANGE_CHAMBER:
      return action.chamber
    default:
      return state
  }
}

const searchTextReducer = (state = initialState.searchText, action) => {
  switch(action.type) {
    case CHANGE_INPUT_SEARCH:
      return action.searchText
    default:
      return state
  }
}

export const getIsFetching = state => state.isFetching

export const getSearchText = state => state.searchText

export const getSession = state => state.session

export const getChamber = state => state.chamber

// add name for search
export const getCongressPeople = (state) => {
  const { session, chamber } = state
  const displayCongressPeople = !!state.congressPeople
        && !!state.congressPeople[session]
        && state.congressPeople[session][chamber]
  // if (searchText.length) {
  //   return displayCongressPeople.filter(c => {
  //     const fullName = `${c.first_name} ${c.middle_name} ${c.last_name}`
  //     return fullName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
  //   })
  // }
  return displayCongressPeople
}

// export default {
//   congressPeopleStore: combineReducers({
//     congressPeople,
//     isFetching,
//     session: sessionReducer,
//     chamber: chamberReducer,
//   })
// }

export default combineReducers({
  congressPeople,
  isFetching,
  session: sessionReducer,
  chamber: chamberReducer,
  searchText: searchTextReducer,
})