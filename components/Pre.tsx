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
    if (copied) return

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
        className="my-4 w-full flex-col rounded border border-gray-300 shadow dark:border-gray-700"
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
        {/* Code block content */}
        <div className="relative">
          <pre>{pre.children}</pre>
          <div className="absolute right-2 top-2">
            <button
              aria-label="Copy code to clipboard"
              type="button"
              title="Copy"
              className={`flex h-8 w-8 items-center justify-center rounded border ${
                hovered ? 'opacity-40' : 'opacity-0'
              } transition-opacity hover:opacity-100 ${copied && 'copy-button-copied'}`}
              onClick={onCopy}
            >
              <span className="relative h-4 w-4">
                <svg viewBox="0 0 24 24" className="copy-button-icon">
                  <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                </svg>
                <svg className="copy-button-success-icon" viewBox="0 0 24 24">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pre
