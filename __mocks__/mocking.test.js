import mockAxios from 'axios'
import api from '../api'

const congressPerson = {
  member_id: "A000360",
  first_name: "Lamar",
  middle_name: "",
  last_name: "Alexander",
  date_of_birth: "1940-07-03",
  gender: "M",
}

const congressPeople = {
  congress: "115",
  chamber: "Senate",
  num_results: 105,
  offset: 0,
  members: [
    {
      id: "A000360",
      title: "Senator, 2nd Class",
      short_title: "Sen.",
      api_uri: "https://api.propublica.org/congress/v1/members/A000360.json",
      first_name: "Lamar",
      middle_name: null,
      last_name: "Alexander",
      suffix: null,
      date_of_birth: "1940-07-03",
      gender: "M",
      party: "R",
    },
    {
      id: "B001230",
      title: "Senator, 1st Class",
      short_title: "Sen.",
      api_uri: "https://api.propublica.org/congress/v1/members/B001230.json",
      first_name: "Tammy",
      middle_name: null,
      last_name: "Baldwin",
      suffix: null,
      date_of_birth: "1962-02-11",
      gender: "F",
      party: "D",
    }
  ]
}

describe('mocking api', () => {

  it('mocking congressperson', async () => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { results: [congressPerson] }
      })
    )

    const result = await api.getCongressPerson("A000360")
    expect(mockAxios.get).toHaveBeenCalled()
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith("congress/v1/members/A000360.json")
    expect(result).toEqual(congressPerson)
  })

  
  it('mocking congresspeople', async () => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { results: [congressPeople] }
      })
    )

    const result = await api.getCongressPeople(115, "member")
    expect(mockAxios.get).toHaveBeenCalled()
    expect(mockAxios.get).toHaveBeenCalledTimes(2)
    expect(mockAxios.get).toHaveBeenCalledWith("congress/v1/115/member/members.json")
    expect(result).toEqual(congressPeople.members)
  })
})