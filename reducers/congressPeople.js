import { combineReducers } from 'redux'
import {
  CONGRESS_PEOPLE_REQUEST,
  CONGRESS_PEOPLE_SUCCESS,
  CONGRESS_PEOPLE_FAILURE,
} from '../actions/congressPeople'

export const initialState = {
  isFetching: false,
  congressPeople: {},
}

export const initialSession = 115
export const initialChamber = 'senate'

// Reducers
const congressPeople = (state = initialState.congressPeople, action) => {
  switch(action.type) {
    case CONGRESS_PEOPLE_SUCCESS:
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
    case CONGRESS_PEOPLE_REQUEST:
      return true
    case CONGRESS_PEOPLE_SUCCESS:
    case CONGRESS_PEOPLE_FAILURE:
      return false
    default:
      return state
  }
}


// Selectors
export const getIsFetching = state => state.congressPeopleStore.isFetching

// add name for search
export const getCongressPeople = (
  state,
  session = initialSession,
  chamber = initialChamber
) => {
  const displayCongressPeople = !!state.congressPeopleStore.congressPeople
        && !!state.congressPeopleStore.congressPeople[session]
        && state.congressPeopleStore.congressPeople[session][chamber]
  // if (searchText.length) {
  //   return displayCongressPeople.filter(c => {
  //     const fullName = `${c.first_name} ${c.middle_name} ${c.last_name}`
  //     return fullName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
  //   })
  // }
  return displayCongressPeople
}

export default combineReducers({
  congressPeople,
  isFetching,
})