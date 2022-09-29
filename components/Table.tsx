import React, { ClassAttributes, TableHTMLAttributes } from 'react'

// type TableProps = {
//   children: React.ReactNode
// }

const Table = (
  props: ClassAttributes<HTMLTableElement> & TableHTMLAttributes<HTMLTableElement>
) => {
  return (
    <div className="border-separate rounded border border-gray-300 bg-opacity-50 px-4 dark:border-gray-800 dark:bg-opacity-50">
      <table className="!my-4">{props.children}</table>
    </div>
  )
}

export default Table
