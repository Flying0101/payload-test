'use client'
import { useTableCell } from '@payloadcms/ui'
import { CellComponentProps } from 'payload'
import { useEffect, useRef } from 'react'

const DoneCell: React.FC<CellComponentProps> = () => {
  const context = useTableCell()
  const childRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (childRef.current) {
      const parentTr = childRef.current.closest('tr')
      if (parentTr && context.cellData) {
        parentTr.style.backgroundColor = 'green'
      }
    }
  }, [])

  return <div ref={childRef}>{context.cellData ? 'Yes' : 'No'}</div>
}

export default DoneCell
