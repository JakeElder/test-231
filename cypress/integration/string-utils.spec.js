import { isElementOfType } from 'react-dom/test-utils'
import { splitMarkParens, wrapMarked } from '../../src/utils/string-utils'

describe('String Utils', () => {
  context('splitMarkParens', () => {
    it('identifies and marks parenthesised portions of a string', () => {
      const input = 'This {ex}{am}{ple} is the {in}{put} string'
      const expected = [
        ['This ', false],
        ['ex', true],
        ['am', true],
        ['ple', true],
        [' is the ', false],
        ['in', true],
        ['put', true],
        [' string', false]
      ]
      expect(splitMarkParens(input)).to.eql(expected)
    })
  })

  context('wrapMarked', () => {
    it('wraps marked substrings in a react element', () => {
      const input = [
        ['This ', false],
        ['ex', true],
        [' is the ', false]
      ]
      const Wrapper = () => null

      const output = wrapMarked(input, Wrapper)

      expect(output[0]).to.eq('This ')
      expect(isElementOfType(output[1], Wrapper)).to.eq(true)
      expect(output[1].props.children).to.eq('ex')
      expect(output[2]).to.eq(' is the ')
    })
  })
})
