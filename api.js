import axios from 'axios'

const API = 'https://api.propublica.org/'

const X_API_KEY = process.env.X_API_KEY || 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr'

let fetch
if (process.env.NODE_ENV === 'test') {
  fetch = axios.get
} else {
  fetch = axios.create({
    baseURL: API,
    // timeout: 2000,
    headers: { 'X-API-Key': X_API_KEY }
  });
}

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