import { getIsFetching } from './reducer'
import { getCongressPeople } from './api'
// import { initialChamber, initialSession } from './components/SearchForm'

export const FETCH_CONGRESS_REQUEST = 'FETCH_CONGRESS_REQUEST'
export const FETCH_CONGRESS_SUCCESS = 'FETCH_CONGRESS_SUCCESS'
export const FETCH_CONGRESS_FAILURE = 'FETCH_CONGRESS_FAILURE'

export const CHANGE_SESSION = 'CHANGE_SESSION'
export const CHANGE_CHAMBER = 'CHANGE_CHAMBER'
export const CHANGE_INPUT_SEARCH = 'CHANGE_INPUT_SEARCH'

export const fetchCongressPeople = () => async (dispatch, getState) => {
  const state = getState()
  // console.log(session, chamber)
  const { session, chamber } = state
  // read cache
  if (state.congressPeople[session] && state.congressPeople[session][chamber]) {
    return dispatch({
      type: FETCH_CONGRESS_SUCCESS,
      response: state.congressPeople[session][chamber],
    })
  }

  // check is already fetching
  if (getIsFetching(state)) {
    return Promise.resolve()
  }

  // fetch congress people
  dispatch({ type: FETCH_CONGRESS_REQUEST })
  try {
    const congressPeople = await getCongressPeople(session, chamber)
    return dispatch({ 
      type: FETCH_CONGRESS_SUCCESS,
      response: congressPeople,
      session,
      chamber,
    })
  } catch(e) {
    return dispatch({ 
      type: FETCH_CONGRESS_FAILURE,
      message: e.message || 'Something went wrong.',
    })
  }
}

// return dispatch(fetchCongressPeople())
export const changeSession = (session) => ({
  type: CHANGE_SESSION,
  session,
})

export const changeChamber = (chamber) => ({
  type: CHANGE_CHAMBER,
  chamber,
})

export const changeInputSearch = (searchText) => ({
  type: CHANGE_INPUT_SEARCH,
  searchText,
})