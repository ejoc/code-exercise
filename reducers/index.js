import congressPeopleReducer, { initialState as congressPeopleState } from './congressPeople'
import congressPersonReducer, { initialState as congressPersonState } from './congressPerson'

export default {
  congressPeopleStore: congressPeopleReducer,
  congressPersonStore: congressPersonReducer,
}

export const initialStates = {
  congressPeopleStore: congressPeopleState,
  congressPersonStore :congressPersonState,
}
