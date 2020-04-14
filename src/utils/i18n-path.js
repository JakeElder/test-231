export default function i18nPath(lang, path) {
  const pathParts = [lang, path].filter(x => x)
  return `/${pathParts.join('/')}`
}
