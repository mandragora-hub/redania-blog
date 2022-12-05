import React from 'react'
import Scramble from '@/lib/utils/scramble'

type TextScrambleProps = {
  phrases: string | string[]
  className?: string
  frame?: number
}

const TextScramble = ({ className, phrases, frame = 1200 }: TextScrambleProps) => {
  const divRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!divRef || !divRef.current) return

    const fx = new Scramble(divRef.current)

    if (typeof phrases == 'string') {
      fx.setText(phrases)
    } else if (typeof phrases == 'object') {
      let counter = 0
      const next = () => {
        fx.setText(phrases[counter]).then(() => {
          setTimeout(next, frame)
        })
        counter = (counter + 1) % phrases.length
      }
      next()
    }
  })

  return <div id="container" className={className} ref={divRef}></div>
}

export default TextScramble
