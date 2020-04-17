import _ from 'lodash'

export function chunkOverlap(input) {
  return _.zip([undefined, ...input], input)
}
