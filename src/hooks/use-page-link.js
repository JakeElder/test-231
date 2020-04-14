import usePage from './use-page'
import { get } from 'lodash/fp'

export default function usePageLink(pageUId, lang, key = 'data.title.text') {
  const page = usePage(pageUId, lang)
  return [page |> get(key), page.data.i18nPath]
}
