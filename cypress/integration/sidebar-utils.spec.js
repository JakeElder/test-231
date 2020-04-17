import { getSectionDividerType } from '../../src/utils/side-bar'

describe('SideBar Utils', () => {
  context('getDividerType', () => {
    it('returns the correct type when no top', () => {
      expect(getSectionDividerType(null, 'past')).to.equal(null)
      expect(getSectionDividerType(null, 'present')).to.equal(null)
      expect(getSectionDividerType(null, 'future')).to.equal(null)
    })
    it('returns the correct type when top == past', () => {
      expect(getSectionDividerType('past', 'past')).to.equal('partial')
      expect(getSectionDividerType('past', 'present')).to.equal('full')
      expect(() => getSectionDividerType('past', 'future')).to.throw()
    })
    it('returns the correct type when top == present', () => {
      expect(() => getSectionDividerType('present', 'past')).to.throw()
      expect(() => getSectionDividerType('present', 'present')).to.throw()
      expect(getSectionDividerType('present', 'future')).to.equal('full')
    })
    it('throws when top == future', () => {
      expect(() => getSectionDividerType('future', 'past')).to.throw()
      expect(() => getSectionDividerType('future', 'present')).to.throw()
      expect(() => getSectionDividerType('future', 'future')).to.throw()
    })
    it('returns the correct type when no bottom', () => {
      expect(getSectionDividerType('past', null)).to.equal(null)
      expect(getSectionDividerType('present', null)).to.equal(null)
      expect(getSectionDividerType('future', null)).to.equal(null)
    })
  })
})
