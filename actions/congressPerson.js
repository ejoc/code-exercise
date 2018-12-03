import { notification } from 'antd'
import { getCongressPerson, getIsFetching } from '../reducers/congressPerson'
import api from '../api'
// action types for fetch congress person
export const CONGRESS_PERSON_REQUEST = 'CONGRESS_PERSON_REQUEST'
export const CONGRESS_PERSON_SUCCESS = 'CONGRESS_PERSON_SUCCESS'
export const CONGRESS_PERSON_FAILURE = 'CONGRESS_PERSON_FAILURE'

export const fecthCongressPerson = id => async (dispatch, getState) => {
  const state = getState()
  let congressPerson = getCongressPerson(state, id)
  if (congressPerson) {
    return dispatch({
      type: CONGRESS_PERSON_SUCCESS,
      response: congressPerson,
    })
  }

  // check is already fetching
  if (getIsFetching(state)) {
    return Promise.resolve()
  }

  // fetch congress person
  dispatch({ type: CONGRESS_PERSON_REQUEST })
  try {
    congressPerson = await api.getCongressPerson(id)
    return dispatch({ 
      type: CONGRESS_PERSON_SUCCESS,
      response: congressPerson,
      id,
    })
  } catch(e) {
    notification.error({
      message: 'Error on fetch data',
      description: e.message || 'Something went wrong.',
    })
    return dispatch({ 
      type: CONGRESS_PERSON_FAILURE,
      message: e.message || 'Something went wrong.',
    })
  }
  // getCongressPerson
}