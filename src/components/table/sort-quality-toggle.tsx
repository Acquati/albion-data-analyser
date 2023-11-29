'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortQualityToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  additionalClass?: string
  children: React.ReactNode
}

const SortQualityToggle: React.FC<SortQualityToggleProps> = ({
  data,
  setData,
  additionalClass,
  children,
}) => {
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

  return (
    <SortButton onClick={onClick} additionalClass={additionalClass}>
      {children}
    </SortButton>
  )
}

export default SortQualityToggle
