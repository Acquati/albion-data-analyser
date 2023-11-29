'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortNameToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  additionalClass?: string
  children: React.ReactNode
}

const SortNameToggle: React.FC<SortNameToggleProps> = ({
  data,
  setData,
  additionalClass,
  children,
}) => {
  const [isSortNameAscending, setIsSortNameAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortNameAscending
    setIsSortNameAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder
          ? (a.name ?? '').localeCompare(b.name ?? '')
          : (b.name ?? '').localeCompare(a.name ?? '')
      )

      setData(newData)
    }
  }

  return (
    <SortButton onClick={onClick} additionalClass={additionalClass}>
      {children}
    </SortButton>
  )
}

export default SortNameToggle
