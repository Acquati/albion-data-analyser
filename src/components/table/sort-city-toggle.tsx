'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortCityToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  additionalClass?: string
  children: React.ReactNode
}

const SortCityToggle: React.FC<SortCityToggleProps> = ({
  data,
  setData,
  additionalClass,
  children,
}) => {
  const [isSortCityAscending, setIsSortCityAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortCityAscending
    setIsSortCityAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.city.localeCompare(b.city) : b.city.localeCompare(a.city)
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

export default SortCityToggle
