import usePage from './use-page'

export default function usePageHref(uid, lang) {
  const page = usePage(uid, lang)
  return page.data.i18nPath
}
