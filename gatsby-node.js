const path = require('path')

module.exports.createPages = function createPages({ actions }) {
  const paths = [
    '/test-unavailable',
    '/introduction',
    '/section-1/part-1',
    '/section-2/part-2',
    '/section-3',
    '/section-4',
    '/summary'
  ]

  const component = path.resolve('src/pages/index.js')

  paths.forEach(path => {
    actions.createPage({ path, component })
  })
}
