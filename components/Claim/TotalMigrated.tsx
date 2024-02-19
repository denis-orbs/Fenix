// @ts-nocheck
'use client'
import { multicall } from '@wagmi/core'
import { useState, useEffect } from 'react'
import chrmigrateabi from '../../abi/chrmigrate.json'
import chrnftmigrateabi from '../../abi/chrnftmigrate.json'
import vechrmigrateabi from '../../abi/vechrmigrate.json'
import elchrmigrateabi from '../../abi/elchrmigrate.json'
import spchrmigrateabi from '../../abi/spchrmigrate.json'
import BigNumber from 'bignumber.js'

interface Account {
  migrateStatus: string | undefined
  acc: string | undefined
  setveChrNftDeposited: (value: BigInt) => void
  setChrNftDeposited: (value: BigInt) => void
  setchramountDeposited: (value: BigInt) => void
  setelChramountDeposited: (value: BigInt) => void
  setspChramountDeposited: (value: BigInt) => void
  setChrNftsTotal: (value: BigInt) => void
  setveChrNftsTotal: (value: BigInt) => void
}

const TotalMigrated = ({
  migrateStatus,
  acc,
  setChrNftDeposited,
  setveChrNftDeposited,
  setchramountDeposited,
  setelChramountDeposited,
  setspChramountDeposited,
  setChrNftsTotal,
  setveChrNftsTotal,
}: Account) => {
  const [chramount, setchramount] = useState<BigInt>(BigInt(0))
  const [elChramount, setelChramount] = useState<BigInt>(BigInt(0))
  const [spChramount, setspChramount] = useState<BigInt>(BigInt(0))
  const [ChrNftIds, setChrNftIdsCount] = useState<BigInt>(BigInt(0))
  const [veChrIds, setveChrIdsCount] = useState<BigInt>(BigInt(0))
  const [chrDeposited, setchrDeposited] = useState<BigInt>(BigInt(0))
  const [vechrDeposited, setvechrDeposited] = useState<BigInt>(BigInt(0))

  const init = async () => {
    await multicall({
      contracts: [
        {
          abi: chrmigrateabi,
          address: '0xC138616F08BB95EB59bB00A4Fa4890084f230A9E',
          functionName: 'depositedAmount',
          args: [acc],
        },
        {
          abi: chrnftmigrateabi,
          address: '0x5fCA02D045aBc311b6073215e549D40a2aFBC1d3',
          functionName: 'totalids',
          args: [acc],
        },
        {
          abi: vechrmigrateabi,
          address: '0x55Eb7F89c6250101B7BCAa2652bF1e3DaC4F3463',
          functionName: 'totalids',
          args: [acc],
        },
        {
          abi: elchrmigrateabi,
          address: '0x98e778795366C0be2bC4aB603A51ebe7eAbf0725',
          functionName: 'depositedAmount',
          args: [acc],
        },
        {
          abi: spchrmigrateabi,
          address: '0xD5d3F7d9cE52094f4BE5BCeb2d52D801541A97A2',
          functionName: 'depositedAmount',
          args: [acc],
        },
      ],
    }).then((data) => {
      if (data) {
        setchramount((data[0]?.result as BigInt) ?? BigInt(0))
        setChrNftIdsCount((data[1]?.result as BigInt) ?? BigInt(0))
        setveChrIdsCount((data[2]?.result as BigInt) ?? BigInt(0))
        setelChramount((data[3]?.result as BigInt) ?? BigInt(0))
        setspChramount((data[4]?.result as BigInt) ?? BigInt(0))

        setChrNftsTotal((data[1]?.result as BigInt) ?? BigInt(0))
        setveChrNftsTotal(data[2]?.result as BigInt) ?? BigInt(0)
        setchramountDeposited((data[0]?.result as BigInt) ?? BigInt(0))
        setelChramountDeposited((data[3]?.result as BigInt) ?? BigInt(0))
        setspChramountDeposited((data[4]?.result as BigInt) ?? BigInt(0))
      }
      const chrnftcontractsArray = []
      const vechrnftcontractsArray = []

      const chrnftids: BigInt[] = []
      const vechrnftids: BigInt[] = []
      if (data) {
        for (let i = 0; i < parseInt(((data[1]?.result as BigInt) ?? BigInt(0)).toString()); i++) {
          chrnftcontractsArray.push({
            abi: chrnftmigrateabi,
            address: '0x5fCA02D045aBc311b6073215e549D40a2aFBC1d3',
            functionName: 'addressToNftIds',
            args: [acc, i],
          })
        }
        for (let i = 0; i < parseInt(((data[2]?.result as BigInt) ?? BigInt(0)).toString()) ?? 0; i++) {
          vechrnftcontractsArray.push({
            abi: vechrmigrateabi,
            address: '0x55Eb7F89c6250101B7BCAa2652bF1e3DaC4F3463',
            functionName: 'addressToNftIds',
            args: [acc, i],
          })
        }

        multicall({
          contracts: [...chrnftcontractsArray],
        }).then((ids) => {
          for (let i = 0; i < ids.length; i++) {
            chrnftids.push(ids[i]?.result as BigInt)
          }
          const deposited: BigInt[] = []
          const depositedIds: BigInt[] = []

          for (let i = 0; i < ids.length ?? 0; i++) {
            deposited.push({
              abi: chrnftmigrateabi,
              address: '0x5fCA02D045aBc311b6073215e549D40a2aFBC1d3',
              functionName: 'deposited',
              args: [parseInt((ids[i]?.result as BigInt).toString()), acc],
            })
          }
          multicall({
            contracts: [...deposited],
          }).then((deposit) => {
            for (let i = 0; i < ids.length; i++) {
              depositedIds.push(deposit[i]?.result as BigInt)
            }
            let count = 0
            chrnftids.map((_, index) => {
              if (!depositedIds[index]) {
                count++
              }
            })
            setchrDeposited(count)
            setChrNftDeposited(count)
          })
        })

        multicall({
          contracts: [...vechrnftcontractsArray],
        }).then((ids) => {
          for (let i = 0; i < ids.length; i++) {
            vechrnftids.push(ids[i]?.result as BigInt)
          }
          const deposited: BigInt[] = []
          const depositedIds: BigInt[] = []

          for (let i = 0; i < ids.length ?? 0; i++) {
            deposited.push({
              abi: vechrmigrateabi,
              address: '0x55Eb7F89c6250101B7BCAa2652bF1e3DaC4F3463',
              functionName: 'deposited',
              args: [parseInt((ids[i]?.result as BigInt).toString()), acc],
            })
          }
          multicall({
            contracts: [...deposited],
          }).then((deposit) => {
            for (let i = 0; i < ids.length; i++) {
              depositedIds.push(deposit[i]?.result as BigInt)
            }
            let count = 0
            vechrnftids.map((_, index) => {
              if (!depositedIds[index]) {
                count++
              }
            })
            setvechrDeposited(count)
            setveChrNftDeposited(count)
          })

          // setisDeposited(depositedIds)
          // settokenIds(nftids)
        })
      }
    })
  }

  useEffect(() => {
    init()
  }, [acc])

  return (
    <div className="relative flex items-center w-full xl:w-2/4 2xl:w-1/3 md:h-[62px] px-4 bg-shark-400 bg-opacity-40 py-2 rounded-lg gap-2">
      <div className="items-center justify-center hidden w-8 h-8 p-2 rounded-lg md:flex bg-shark-400 bg-opacity-60">
        <span
          className={`inline-block text-xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-compass`}
        ></span>
      </div>
      {migrateStatus == 'wrong' ? (
        <div className="w-full">
          <p className="mb-3 text-xs text-shark-100 md:mb-0">Share of veFNX given to non snapshot CHR Migrators</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-2 md:flex-nowrap">
            <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
              <h3 className="text-sm text-white">20k$ worth of veFNX</h3>
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
            </div>
            <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
              <h3 className="text-sm text-white">Total CHR Deposited Non-Snapshot:</h3>
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <p className="mb-3 text-xs text-shark-100 md:mb-0">Total Migrated Amount to FNX</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-2 md:flex-nowrap">
            <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
              <h3 className="text-sm text-white">
                {chramount ? parseInt(new BigNumber(chramount.toString()).dividedBy(10 ** 18).toString()) : 0} CHR
              </h3>
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
            </div>
            <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
              <h3 className="text-sm text-white">
                {parseInt(veChrIds.toString()) - parseInt(vechrDeposited.toString())} veCHR{' '}
              </h3>
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
            </div>
            <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
              <h3 className="text-sm text-white">
                {parseInt(ChrNftIds.toString()) - parseInt(chrDeposited.toString())} chrNFTs
              </h3>
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
            </div>
            <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
              <h3 className="text-sm text-white">
                {elChramount ? parseInt(new BigNumber(elChramount.toString()).dividedBy(10 ** 18).toString()) : 0} elCHR
              </h3>
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
            </div>
            <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
              <h3 className="text-sm text-white">
                {spChramount ? parseInt(new BigNumber(spChramount.toString()).dividedBy(10 ** 18).toString()) : 0} spCHR
              </h3>
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TotalMigrated
