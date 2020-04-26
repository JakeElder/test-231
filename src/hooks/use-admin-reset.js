import axios from 'axios'
import { useHotkeys } from 'react-hotkeys-hook'

function useAdminReset() {
  useHotkeys('shift+r', async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[ADMIN] resetting')
      await axios.post('/api/admin/reset')
      console.log('[ADMIN] reset')
    }
  })
}

export default useAdminReset
