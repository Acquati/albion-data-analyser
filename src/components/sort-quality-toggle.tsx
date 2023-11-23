'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MarketItem } from '@/types/MarketItem'
import SortButton from './sort-button'

interface SortQualityToggleProps {
  data: MarketItem[] | null
  setData: Dispatch<SetStateAction<MarketItem[] | null>>
}

const SortQualityToggle: React.FC<SortQualityToggleProps> = ({ data, setData }) => {
  const [isSortQualityAscending, setIsSortQualityAscending] = useState<boolean>(true)

  const handleSortQualityToggle = () => {
    const newOrder = !isSortQualityAscending
    setIsSortQualityAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.quality - b.quality : b.quality - a.quality
      )

      setData(newData)
    }
  }

  return <SortButton onClick={handleSortQualityToggle} />
}

export default SortQualityToggle