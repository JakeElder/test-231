import axios from 'axios'

async function checkToken(token) {
  const { status } = await axios(`/api/session/${token}`)
  return status === 200
}

export { checkToken }
