import { notification } from 'antd'
import {
  getIsFetching,
  initialChamber,
  initialSession,
  getCongressPeople,
} from '../reducers/congressPeople'
import api from '../api'
// import { initialChamber, initialSession } from './components/SearchForm'

// action types for fetch congress people
export const CONGRESS_PEOPLE_REQUEST = 'CONGRESS_PEOPLE_REQUEST'
export const CONGRESS_PEOPLE_SUCCESS = 'CONGRESS_PEOPLE_SUCCESS'
export const CONGRESS_PEOPLE_FAILURE = 'CONGRESS_PEOPLE_FAILURE'

export const fetchCongressPeople = (
  session = initialSession,
  chamber = initialChamber,
) => async (dispatch, getState) => {
  const state = getState()
  let congressPeople = getCongressPeople(state, session, chamber)
  // read cache
  // if (state.congressPeople[session] && state.congressPeople[session][chamber]) {
  if (congressPeople) {
    return dispatch({
      type: CONGRESS_PEOPLE_SUCCESS,
      response: congressPeople,
    })
  }

  // check is already fetching
  if (getIsFetching(state)) {
    return Promise.resolve()
  }

  // fetch congress people
  dispatch({ type: CONGRESS_PEOPLE_REQUEST })
  try {
    congressPeople = await api.getCongressPeople(session, chamber)
    return dispatch({ 
      type: CONGRESS_PEOPLE_SUCCESS,
      response: congressPeople,
      session,
      chamber,
    })
  } catch(e) {
    notification.error({
      message: 'Error on fetch data',
      description: e.message || 'Something went wrong.',
    })
    return dispatch({ 
      type: CONGRESS_PEOPLE_FAILURE,
      message: e.message || 'Something went wrong.',
    })

  }
}
