import { useContext } from 'react'
import { PageContext } from '../page-context-provider'
import usePage from './use-page'

export default function useCurrentPage() {
  const { uid, lang } = useContext(PageContext)
  return usePage(uid, lang)
}
