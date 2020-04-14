// Source: https://github.com/react-spring/react-spring/issues/544

import { useSpring, config } from 'react-spring'

/**
 * use like let { scrollTo } = useScrollToElement()
 * let elemRef = useRef()
 * scrollTo(elemRef.current)
 */
export default function useScrollToElement() {
  let [, set, stop] = useSpring(() => {})

  function handleIntervention() {
    removeListeners()
    stop()
  }

  function removeListeners() {
    window.removeEventListener('touchmove', handleIntervention)
    window.removeEventListener('click', handleIntervention)
    window.removeEventListener('wheel', handleIntervention)
  }

  let scrollTo = node => {
    const s = {
      from: {
        y: window.scrollY
      },
      y: node.getBoundingClientRect().top + window.pageYOffset,
      reset: true,
      onFrame: ({ y }) => {
        window.scrollTo(0, y)
      },
      config: { ...config.slow, tension: 200, friction: 110 },
      onRest: () => {
        removeListeners()
      }
    }
    window.addEventListener('wheel', handleIntervention)
    window.addEventListener('touchmove', handleIntervention)
    setTimeout(() => {
      window.addEventListener('click', handleIntervention)
    }, 0)
    set(s)
  }

  return { scrollTo }
}
