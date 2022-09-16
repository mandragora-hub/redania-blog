import React, { useState, useRef } from 'react'

type PreProps = {
  children: React.ReactNode
}

const Pre = (props: PreProps) => {

  React.useEffect(() => {console.log(props.children)}, [props.children])

  const textInput = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    const copiedText = textInput.current!.textContent
    if (copiedText) {
      setCopied(true)
      navigator.clipboard.writeText(copiedText)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <div className="flex w-full flex-col items-center px-12">
      <div
        ref={textInput}
        onMouseEnter={onEnter}
        onMouseLeave={onExit}
        className="relative my-4 w-full flex-col rounded border border-gray-300 shadow dark:border-gray-700"
      >
        {hovered && (
          <button
            aria-label="Copy code"
            type="button"
            className={`absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
              copied
                ? 'border-green-400 focus:border-green-400 focus:outline-none'
                : 'border-gray-300'
            }`}
            onClick={onCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className={copied ? 'text-green-400' : 'text-gray-300'}
            >
              {copied ? (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </>
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </>
              )}
            </svg>
          </button>
        )}

        <pre>{props.children}</pre>
      </div>
    </div>
  )
}

export default Pre
