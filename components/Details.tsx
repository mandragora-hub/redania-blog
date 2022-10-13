import React from 'react'

type DetailsProps = {
  title?: string
  children: React.ReactNode
}

// Collapsible Section
const Details = ({ title, children }: DetailsProps) => {
  return (
    <details open>
      <summary className="pt-2 pb-2 text-xl font-bold">{title || 'Collapsible section'}</summary>
      <div className="ml-6">{children}</div>
    </details>
  )
}

export default Details
