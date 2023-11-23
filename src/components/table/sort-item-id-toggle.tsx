'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MarketItem } from '@/types/MarketItem'
import SortButton from './sort-button'

interface SortItemIDToggleProps {
  data: MarketItem[] | null
  setData: Dispatch<SetStateAction<MarketItem[] | null>>
  children: React.ReactNode
}

const SortItemIDToggle: React.FC<SortItemIDToggleProps> = ({ data, setData, children }) => {
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

  return <SortButton onClick={onClick}>{children}</SortButton>
}

export default SortItemIDToggle
