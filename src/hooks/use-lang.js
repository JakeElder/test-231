import { useContext } from 'react'
import { PageContext } from '../page-context-provider'

export default function useLang() {
  const { lang } = useContext(PageContext)
  return lang
}
