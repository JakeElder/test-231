export function getSectionDividerType(top, bottom) {
  switch (true) {
    case (!top || !bottom):
      return null
    case top === 'past' && bottom === 'past':
      return 'partial'
    case top === 'past' && bottom === 'present':
    case top === 'present' && bottom === 'future':
      return 'full'
    default:
      throw new Error('Bad Section Combo')
  }
}
