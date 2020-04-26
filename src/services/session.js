import axios from 'axios'

async function checkToken(token) {
  const { status } = await axios(`/api/session/${token}`)
  return status === 200
}

async function find(token) {
  const { status, data } = await axios(`/api/session/${token}`)
  if (status !== 200) {
    return null
  }
  return data.data
}

export { checkToken }
export { find }
