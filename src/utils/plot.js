import _ from 'lodash'

export function getSectionDividerType(top, bottom) {
  switch (true) {
    case (!top || !bottom):
      return 'none'
    case top === 'past' && bottom === 'past':
      return 'partial'
    case top === 'past' && bottom === 'present':
    case top === 'present' && bottom === 'future':
      return 'full'
    default:
      throw new Error('Bad Section Combo')
  }
}

export function getFinalisedSectionTypes(isPlotFinished, sections) {
  const currentSectionIndex = sections.findIndex(s => s.props.current)

  if (currentSectionIndex === -1) {
    const allAre = isPlotFinished ? 'past' : 'future'
    return _.fill(Array(sections.length), allAre)
  }

  return [
    ..._.fill(Array(currentSectionIndex), 'past'),
    'present',
    ..._.fill(Array(sections.length - (currentSectionIndex + 1)), 'future')
  ]
}
