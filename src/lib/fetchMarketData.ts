import { Dispatch, SetStateAction } from 'react'
import { MarketItem } from '@/types/MarketItem'

interface GetPrices {
  items: string[]
  marketNames: string[]
  setResponseFeedback: Dispatch<SetStateAction<string>>
}

const fetchMarketData = async ({ items, marketNames, setResponseFeedback }: GetPrices) => {
  const APIHostURL = 'https://west.albion-online-data.com'
  const pricesEndpoint = '/api/v2/stats/Prices/'
  const itemList = items.join('%2C')
  const format = '.json'
  const locations = '?locations=' + marketNames.join('%2C')
  // 0 = all the qualities, 1 to 5 specific quality
  const qualities = '&qualities=' + '0'
  const APIEndpoint = pricesEndpoint + itemList + format + locations + qualities
  const requestInfo = APIHostURL + APIEndpoint

  let lastCallTime = null
  let callCount1Min = 0
  let callCount5Min = 0

  try {
    if (requestInfo.length > 4096) {
      setResponseFeedback('Error: Exceeded 4096 characters limit of the request information.')
      throw new Error('Exceeded 4096 characters limit of the request information.')
    }

    const now = Date.now()

    // 180 per minute rate limit logic.
    if (lastCallTime && now - lastCallTime < 60000) {
      callCount1Min += 1
    } else {
      callCount1Min = 1
      lastCallTime = now
    }

    // 300 per 5 minutes rate limit logic.
    if (lastCallTime && now - lastCallTime < 300000) {
      callCount5Min += 1
    } else {
      callCount5Min = 1
    }

    if (callCount1Min > 180) {
      setResponseFeedback('Error: API call rate limit exceeded 180 per minute.')
      throw new Error('API call rate limit exceeded 180 per minute.')
    }

    if (callCount5Min > 300) {
      setResponseFeedback('Error: API call rate limit exceeded 300 per 5 minutes.')
      throw new Error('API call rate limit exceeded 300 per 5 minutes.')
    }

    const response = await fetch(requestInfo)
    const data: MarketItem[] = await response.json()
    const filteredData = data.filter(
      (item) =>
        item.buy_price_max !== 0 ||
        item.buy_price_min !== 0 ||
        item.sell_price_max !== 0 ||
        item.sell_price_min !== 0
    )

    setResponseFeedback('Data successfully fetched.')
    return filteredData
  } catch (error) {
    console.error(error)
    setResponseFeedback('Error: ' + String(error))
    return null
  }
}

export default fetchMarketData
