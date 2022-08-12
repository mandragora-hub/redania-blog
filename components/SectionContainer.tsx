import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <div className="mx-auto max-w-4xl px-4 xl:px-0">{children}</div>
}
