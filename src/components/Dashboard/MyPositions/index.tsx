import { useEffect, useState } from 'react'
import { Button } from '../../UI'
import PositionTable from './PositionTable'
import { useDispatch } from 'react-redux'
import { positions } from '../MyStrategies/Strategy'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useAccount } from 'wagmi'
import { fetchNativePrice, fetchV3Positions } from '@/src/state/liquidity/reducer'
import { getPositionDataByPoolAddresses } from '@/src/library/hooks/liquidity/useCL'
import { setApr } from '@/src/state/apr/reducer'
import { useIchiPositions } from '@/src/library/hooks/web3/useIchi'
import { getPositionAPR } from '@/src/library/hooks/algebra/getPositionApr'
import { Address } from 'viem'
import Spinner from '../../Common/Spinner'
import PositionTableMobile from './PositionTableMobile'
import { useQuery } from '@tanstack/react-query'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
// import useStore from '@/src/state/zustand'

const MyPositions = () => {
  const dispatch = useDispatch()
  const [position, setposition] = useState<positions[]>([])
  const [positionAmounts, setpositionAmounts] = useState<any>([])
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  // const isConnected = useStore((state) => state.isConnected)
  const { isConnected } = useActiveConnectionDetails()

  const tokensprice = async () => {
    setTokens(await fetchTokens())
  }
  useEffect(() => {
    tokensprice()
  }, [])

  const { address } = useAccount()

  const fetchpositions = async (address: Address) => {
    const positions = await fetchV3Positions(address)
    const nativePrice = await fetchNativePrice()
    const positionsPoolAddresses = await positions.map((position: positions) => {
      return {
        id: position.pool.id,
        liq: position.liquidity,
        lower: position.tickLower.tickIdx,
        higher: position.tickUpper.tickIdx,
      }
    })
    const amounts: any = await getPositionDataByPoolAddresses(positionsPoolAddresses)
    const aprs = await Promise.all(
      positions.map((position: positions, index: number) => {
        return getPositionAPR(position.liquidity, position, position.pool, position.pool.poolDayData, nativePrice)
      })
    )
    const final = positions.map((position: positions, index: number) => {
      // console.log(Number(amounts[index][0]) / 10 ** Number(position.token0.decimals), 'hehehe')
      return {
        ...position,
        depositedToken0: Number(amounts[index][0]) / 10 ** Number(position.token0.decimals), // Assigning amount0 to depositedToken0
        depositedToken1: Number(amounts[index][1]) / 10 ** Number(position.token1.decimals), // Assigning amount1 to depositedToken1
        apr: isNaN(aprs[index]) ? '0.00%' : aprs[index].toFixed(2) + '%',
      }
    })
    setposition((prevPositions) => [...prevPositions, ...final])
    setpositionAmounts(amounts)
    setLoading(false)
  }
  useEffect(() => {
    if (address) fetchpositions(address)
    setLoading(true)
  }, [address])

  useEffect(() => {
    // FIXME: STARK
    dispatch(setApr(position))
  }, [position, dispatch])

  const { data: ringsCampaign, isLoading: isLoadingRingsCampaign } = useQuery({
    queryKey: ['ringsPointsCampaign'],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const response = await fetch('/api/rings/campaign')
      return response.json()
    },
  })
  return (
    <>
      {position.length !== 0 && loading === false && isLoadingRingsCampaign === false && address ? (
        <div className="mb-10 mt-5">
          <div className="flex justify-between mb-4 items-center">
            <h1 className="text-white text-xl">My Positions</h1>
            <Button variant="tertiary" className="!py-3 xl:me-5 !text-xs !lg:text-sm" href="/liquidity">
              <span className="icon-logout "></span>Create position
            </Button>
          </div>
          <div className="dashboard-box flex-col xl:flex-row">
            <PositionTable data={position} tokens={tokens} ringsCampaign={ringsCampaign} />
            <PositionTableMobile data={position} tokens={tokens} ringsCampaign={ringsCampaign} />
          </div>
        </div>
      ) : (position.length === 0 && loading === false && isLoadingRingsCampaign === false) || address === undefined ? (
        <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10 mx-auto">
          <div className="text-white flex justify-between items-center">
            <p className="flex gap-3 text-lg ms-2">My Positions</p>
            <Button variant="tertiary" className={`!py-3 xl:me-5 !text-xs !lg:text-sm ${isConnected === true ? '!block' : '!hidden'}`} href="/liquidity">
              <span className="icon-logout"></span>Create position
            </Button>
          </div>
          <div className="box-dashboard p-6 flex gap-8 items-center ">
            <p className="text-white text-sm">You have no positions.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10 mx-auto">
          <div className="text-white flex justify-between items-center">
            <p className="flex gap-3 text-lg ms-2">My Positions</p>
          </div>
          <div className="box-dashboard p-6 flex gap-8 justify-center items-center ">
            <p className="text-white text-sm flex items-center gap-3">
              <Spinner /> Loading
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyPositions
