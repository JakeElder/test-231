import { wrapParenned } from '../utils/string-utils'

function WrapParenned({ component, children }) {
  return wrapParenned(children, component)
}

export default WrapParenned
