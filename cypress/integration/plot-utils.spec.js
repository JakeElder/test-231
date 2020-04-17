import {
  getSectionDividerType,
  getFinalisedSectionTypes
} from '../../src/utils/plot'

describe('Plot Utils', () => {
  context('getDividerType', () => {
    it('returns the correct type when no top', () => {
      expect(getSectionDividerType(null, 'past')).to.equal('none')
      expect(getSectionDividerType(null, 'present')).to.equal('none')
      expect(getSectionDividerType(null, 'future')).to.equal('none')
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
      expect(getSectionDividerType('future', 'future')).to.equal('partial')
    })
    it('returns the correct type when no bottom', () => {
      expect(getSectionDividerType('past', null)).to.equal('none')
      expect(getSectionDividerType('present', null)).to.equal('none')
      expect(getSectionDividerType('future', null)).to.equal('none')
    })
  })

  context('getFinalisedSectionTypes', () => {
    it('Returns all as "future" if plot is not finished and no current section set', () => {
      const input = [false, [{ props: {} }, { props: {} }, { props: {} }]]
      const expected = ['future', 'future', 'future']
      expect(getFinalisedSectionTypes(...input)).to.eql(expected)
    })

    it('Returns all as "past" if plot is finished', () => {
      const input = [true, [{ props: {} }, { props: {} }, { props: {} }]]
      const expected = ['past', 'past', 'past']
      expect(getFinalisedSectionTypes(...input)).to.eql(expected)
    })

    it('Returns sections preceding current as "past", current as "present" and those superceding current as "future" if a current is set', () => {
      const input = [
        false,
        [{ props: {} }, { props: { current: true } }, { props: {} }]
      ]
      const expected = ['past', 'present', 'future']
      expect(getFinalisedSectionTypes(...input)).to.eql(expected)
    })
  })
})
