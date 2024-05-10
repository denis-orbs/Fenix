import { useQuery } from '@tanstack/react-query'
import useActiveConnectionDetails from '../web3/useActiveConnectionDetails'
import { RING_POINTS_ADDRESS } from '../../constants/addresses'
import { toBN } from '../../utils/numbers'

export const useRingsPoints = () => {
  const { account, chainId } = useActiveConnectionDetails()

  const fetchPoints = async () => {
    const response = await fetch(`https://api.merkl.xyz/v3/rewards?user=${account}`)
    if (!response.ok) {
      return {
        points: 0,
        userAddress: account,
        error: 'Error fetching points',
        isLoading: false,
      }
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['ringsPoints', account],
    queryFn: fetchPoints,
    enabled: !!account,
    staleTime: 1000 * 60 * 20, // 20 minutes
    select: (data) => {
      if (!chainId || !RING_POINTS_ADDRESS[chainId]) return 0
      const accumulatedRaw = data?.[chainId]?.tokenData?.[RING_POINTS_ADDRESS[chainId]]?.accumulated
      const decimals = data?.[chainId]?.tokenData?.[RING_POINTS_ADDRESS[chainId]]?.decimals
      const points =
        accumulatedRaw && decimals
          ? toBN(accumulatedRaw)
              .div(10 ** decimals)
              .toString()
          : '0'
      return points
    },
  })

  return {
    points: data || 0,
    isLoading,
    userAddress: account,
    error: error?.message || '',
  }
}
