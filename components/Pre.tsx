import React, { useState, useRef, ClassAttributes, HTMLAttributes } from 'react'

type preProps = ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> & {
    title?: string
  }

const Pre = (pre: preProps) => {
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
        {pre.title && (
          <div className="relative flex w-full items-center justify-start rounded-t border-b-2 border-gray-300 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-center p-1">
              <div className=" m-1 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className=" m-1 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className=" m-1 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
            <div className="absolute left-0 flex w-full items-center justify-center">
              <span
                className="filename font-sans text-sm font-bold text-gray-500 dark:text-gray-400"
                data-title={pre.title}
              ></span>
            </div>
          </div>
        )}

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

        <pre>{pre.children}</pre>
      </div>
    </div>
  )
}

export default Pre
