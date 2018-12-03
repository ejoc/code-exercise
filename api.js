import axios from 'axios'

const API = 'https://api.propublica.org/'

const fetch = axios.create({
  baseURL: API,
  timeout: 2000,
  headers: {'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr'}
});

async function getCongressPeople(session, chamber) {
  const { data } = await fetch(`congress/v1/${session}/${chamber}/members.json`)
  return data.results[0].members
}

async function getCongressPerson(id) {
  const { data } = await fetch(`congress/v1/members/${id}.json`)
  return data.results[0]
}

export default {
  getCongressPeople,
  getCongressPerson,
}