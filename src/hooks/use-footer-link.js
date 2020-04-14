import usePageLink from './use-page-link'

export default function useFooterLink(pageUId, lang) {
  return usePageLink(pageUId, lang, 'data.footerLinkText')
}
