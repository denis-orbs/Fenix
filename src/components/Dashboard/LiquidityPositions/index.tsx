'use client'

import { Button, TableSkeleton } from '@/src/components/UI'
import HeaderRow from '@/src/components/Liquidity/Tables/HeaderRow'
import { PROPS_CLASSIC_LIQUIDITY } from '../types'
import INFO_API from '../data'
import { useV2PairsData } from '@/src/state/liquidity/hooks'
import { useEffect, useMemo, useState } from 'react'
import { PoolData } from '@/src/state/liquidity/types'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { fromWei } from '@/src/library/utils/numbers'
import { fetchRingsPoolApr } from '../../Liquidity/Tables/LiquidityTable/getAprRings'
import NotFoundLock from '../../Lock/NotFoundLock'

const LiquidityPositions = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isSetRingsApr, setIsSetRingsApr] = useState<boolean>(false)
  const [poolsDataClassic, setPoolsDataClassic] = useState<PoolData[]>([])
  const [poolsDataClassicRing, setPoolsDataClassicRing] = useState<PoolData[]>([])
  const { address } = useAccount()
  const { loading: loadingV2Pairs, data: v2PairsData } = useV2PairsData()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  useEffect(() => {
    const filterPoolsDataClassic = () => {
      setLoading(true)
      const filteredData: PoolData[] = (v2PairsData || [])
        .filter((pool) => pool.pairSymbol !== 'Concentrated pool')
        .filter((row) => Number(fromWei(row.pairInformationV2?.account_lp_balance.toString(), 18)) !== 0)
        .map((row) => ({
          pairDetails: row, // Add the required pairDetails property
        }))
      setPoolsDataClassic(filteredData)
      setLoading(false)
    }

    filterPoolsDataClassic()
  }, [v2PairsData, loading, address])

  useEffect(() => {
    const updateRingsApr = async () => {
      if (!isSetRingsApr && poolsDataClassic.length > 0 && !('aprRings' in poolsDataClassic[0])) {
        setLoading(true)
        const newArr = await Promise.all(
          poolsDataClassic.map(async (pool: any) => {
            if (pool.pairDetails?.pairSymbol) {
              return {
                ...pool,
                pairDetails: {
                  ...pool.pairDetails,
                  maxAPR: Number(await fetchRingsPoolApr(pool.pairDetails)) + Number(pool.pairDetails?.apr),
                },
              }
            } else {
              return pool
            }
          })
        )
        setPoolsDataClassicRing(newArr)
        setIsSetRingsApr(true)
        setLoading(false)
      }
    }

    updateRingsApr()
  }, [poolsDataClassic, isSetRingsApr, address])

  useEffect(() => {
    // Reset relevant states when the address changes
    setLoading(true)
    setPoolsDataClassic([])
    setPoolsDataClassicRing([])
    setIsSetRingsApr(false)
  }, [address])

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between mb-4 items-center">
          <h1 className="text-white text-xl">Classic Liquidity Positions</h1>
          <Button variant="tertiary" className="!py-3 xl:me-5 !text-xs !lg:text-sm" href="/liquidity">
            <span className="icon-logout"></span>New deposit
          </Button>
        </div>
        <div className={`${poolsDataClassicRing.length > 0 ? 'dashboard-box' : 'box-dashboard'}`}>
          <div className="rounded-lg z-10">
            <h1 className="text-white p-3">Classic liquidity</h1>
            {loading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableSkeleton key={index} />
                ))}
              </>
            ) : poolsDataClassicRing.length > 0 ? (
              <HeaderRow {...PROPS_CLASSIC_LIQUIDITY} poolData={poolsDataClassicRing} />
            ) : (
              <>
                <div className="box-dashboard p-6">
                  <NotFoundLock info={'No Pools Found.'} />
                  {/* {Array.from({ length: 5 }).map((_, index) => (
                    <TableSkeleton key={index} />
                  ))} */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default LiquidityPositions
