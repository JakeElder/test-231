import { useState, useEffect } from 'react'

function getCorrectHero(breakWidth, currentWidth, [narrow, wide]) {
  return currentWidth < breakWidth ? narrow : wide
}

function useResponsiveHero(breakWidth, currentWidth, [narrow, wide]) {
  const args = arguments

  const [hero, setHero] = useState(getCorrectHero(...args))

  useEffect(() => {
    setHero(getCorrectHero(...args))
  }, [args])

  return hero
}

export default useResponsiveHero
