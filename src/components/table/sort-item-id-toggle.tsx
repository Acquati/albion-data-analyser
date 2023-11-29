'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortItemIDToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  additionalClass?: string
  children: React.ReactNode
}

const SortItemIDToggle: React.FC<SortItemIDToggleProps> = ({
  data,
  setData,
  additionalClass,
  children,
}) => {
  const [isSortItemIDAscending, setIsSortItemIDAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortItemIDAscending
    setIsSortItemIDAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.item_id.localeCompare(b.item_id) : b.item_id.localeCompare(a.item_id)
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

export default SortItemIDToggle
