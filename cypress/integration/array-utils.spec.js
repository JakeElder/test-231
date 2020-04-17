import { chunkOverlap } from '../../src/utils/array-utils'

describe('Array Utils', () => {
  context('chunkOverlap', () => {
    it('chunks an array in to overlapping tupples', () => {
      const input = [1, 2, 3, 4, 5]
      const expected = [
        [undefined, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, undefined]
      ]
      expect(chunkOverlap(input)).to.eql(expected)
    })
  })
})
