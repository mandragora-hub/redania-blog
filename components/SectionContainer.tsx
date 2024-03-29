import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>
}
