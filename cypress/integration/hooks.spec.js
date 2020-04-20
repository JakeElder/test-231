import { renderHook, act } from '@testing-library/react-hooks'
import useRadio from '../../src/hooks/use-radio'

describe('Hooks', () => {
  context('useRadio', () => {
    it('Manages state over components based on name', () => {
      const q1a = renderHook(() => useRadio('question-1', 'a'))
      const q1b = renderHook(() => useRadio('question-1', 'b'))

      const q2a = renderHook(() => useRadio('question-2', 'a'))
      const q2b = renderHook(() => useRadio('question-2', 'b'))

      act(() => {
        q1a.result.current.select()
      })

      expect(q1a.result.current.selected).to.equal(true)
      expect(q1b.result.current.selected).to.equal(false)
      expect(q2a.result.current.selected).to.equal(false)
      expect(q2b.result.current.selected).to.equal(false)

      act(() => {
        q1b.result.current.select()
      })

      expect(q1b.result.current.selected).to.equal(true)
      expect(q1a.result.current.selected).to.equal(false)
      expect(q2a.result.current.selected).to.equal(false)
      expect(q2b.result.current.selected).to.equal(false)

      act(() => {
        q2b.result.current.select()
      })

      expect(q1b.result.current.selected).to.equal(true)
      expect(q1a.result.current.selected).to.equal(false)
      expect(q2a.result.current.selected).to.equal(false)
      expect(q2b.result.current.selected).to.equal(true)

      act(() => {
        q2a.result.current.select()
      })

      expect(q1b.result.current.selected).to.equal(true)
      expect(q1a.result.current.selected).to.equal(false)
      expect(q2a.result.current.selected).to.equal(true)
      expect(q2b.result.current.selected).to.equal(false)
    })
  })
})
