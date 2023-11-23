'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MarketItem } from '@/types/MarketItem'
import SortButton from './sort-button'

interface SortQualityToggleProps {
  data: MarketItem[] | null
  setData: Dispatch<SetStateAction<MarketItem[] | null>>
  children: React.ReactNode
}

const SortQualityToggle: React.FC<SortQualityToggleProps> = ({ data, setData, children }) => {
  const [isSortQualityAscending, setIsSortQualityAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortQualityAscending
    setIsSortQualityAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.quality - b.quality : b.quality - a.quality
      )

      setData(newData)
    }
  }

  return <SortButton onClick={onClick}>{children}</SortButton>
}

export default SortQualityToggle
