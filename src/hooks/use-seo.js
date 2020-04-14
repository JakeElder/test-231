import useCurrentPage from './use-current-page'

function useSEO() {
  const page = useCurrentPage()
  return {
    essential: {
      lang: page.lang,
      title: page.data.title.text,
      description: page.data.description.text
    }
  }
}

export default useSEO
