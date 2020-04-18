import { formatDuration } from '../../src/utils/number-utils'

describe('Number Utils', () => {
  context('formatDuration', () => {
    it('Converts a ms value in to human readable mm:ss format', () => {
      expect(formatDuration(5000)).to.eql('00:05')
      expect(formatDuration(60 * 1000)).to.eql('01:00')
      expect(formatDuration(61 * 1000)).to.eql('01:01')
    })
    it('Handles sub 1 second values', () => {
      expect(formatDuration(1)).to.eql('00:00')
      expect(formatDuration(499)).to.eql('00:00')
      expect(formatDuration(500)).to.eql('00:01')
    })
  })
})
