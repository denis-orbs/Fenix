//@ts-nocheck
// @typescript-eslint/no-explicit-any
'use client'

import { Button } from '@/components/UI'
import useStore from '@/store'
import { useAccount } from 'wagmi'
import { multicall } from '@wagmi/core'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import chrmigrateabi from '../../abi/chrmigrate.json'
import chrnftmigrateabi from '../../abi/chrnftmigrate.json'
import vechrmigrateabi from '../../abi/vechrmigrate.json'
import elchrabi from '../../abi/elchr.json'
import spchrabi from '../../abi/spchr.json'
import chrabi from '../../abi/chr.json'
import vechrNftabi from '../../abi/vechr.json'
import chrNftabi from '../../abi/chrnft.json'

interface AddressCheckProps {
  migrateStatus: string | undefined
  setMigrateStatus: (status: string) => void
  setchramount: (value: BigInt) => void
  setelChramount: (value: BigInt) => void
  setspChramount: (value: BigInt) => void
  setChrNftIds: (value: BigInt) => void
  setveChrIds: (value: BigInt) => void
  setacc: (value: string) => void
  setchrBalanceOf: (value: BigInt) => void
  setchrNftBalanceOf: (value: BigInt) => void
  setvechrNftBalanceOf: (value: BigInt) => void
}

const AddressCheck = ({
  migrateStatus,
  setMigrateStatus,
  setchramount,
  setspChramount,
  setelChramount,
  setChrNftIds,
  setveChrIds,
  setchrBalanceOf,
  setchrNftBalanceOf,
  setvechrNftBalanceOf,
  setacc,
}: AddressCheckProps) => {
  const isConnected = useStore((state) => state.isConnected)
  const [account, setaccount] = useState<string | undefined>()

  const accounts = useAccount()

  useEffect(() => {
    if (accounts && accounts.address) {
      setaccount(accounts?.address)
    }
  }, [accounts?.address])

  const handlerMigrateCheck = async (status: string) => {
    setMigrateStatus(status)
    setacc(account)
    await multicall({
      contracts: [
        {
          abi: chrmigrateabi,
          address: '0x5152875C0982b57dd9515A8230eE3621E774aCB1',
          functionName: 'depositDuration',
        },
        {
          abi: chrmigrateabi,
          address: '0x5152875C0982b57dd9515A8230eE3621E774aCB1',
          functionName: 'deploymentTimestamp',
        },
        {
          abi: chrmigrateabi,
          address: '0x5152875C0982b57dd9515A8230eE3621E774aCB1',
          functionName: 'userBalances',
          args: [account],
        },
        {
          abi: chrnftmigrateabi,
          address: '0x0372Fd0930f0956766bC61933ceD9daC9Fe6b8b8',
          functionName: 'totalids',
          args: [account],
        },
        {
          abi: vechrmigrateabi,
          address: '0x1bFd1e832Be53D423d1F5b8f91C37FBB492af322',
          functionName: 'totalids',
          args: [account],
        },
        {
          abi: elchrabi,
          address: '0xD600Ec98cf6418c50EE051ACE53219D95AeAa134',
          functionName: 'balanceOf',
          args: [account],
        },
        {
          abi: spchrabi,
          address: '0xFEA2906087D82BD8Da630E7E2c7D9a4dEb061097',
          functionName: 'balanceOf',
          args: [account],
        },
        {
          abi: chrmigrateabi,
          address: '0x5152875C0982b57dd9515A8230eE3621E774aCB1',
          functionName: 'isWithinDepositPeriod',
        },
        {
          abi: chrabi,
          address: '0x15b2fb8f08e4ac1ce019eadae02ee92aedf06851',
          functionName: 'balanceOf',
          args: [account],
        },
        {
          abi: chrNftabi,
          address: '0x55d26d7e20bfb42948a05d6d9a69af8fd5400fa0',
          functionName: 'balanceOf',
          args: [account],
        },
        {
          abi: vechrNftabi,
          address: '0x9A01857f33aa382b1d5bb96C3180347862432B0d',
          functionName: 'balanceOf',
          args: [account],
        },
      ],
    }).then((data) => {
      if (data) {
        setchramount(data[2]?.result ?? BigInt(0))
        setChrNftIds(data[9]?.result ?? BigInt(0))
        setveChrIds(data[4]?.result ?? BigInt(0))
        setelChramount(data[5]?.result ?? BigInt(0))
        setspChramount(data[6]?.result ?? BigInt(0))
        setchrBalanceOf(data[8]?.result ?? BigInt(0))
        setchrNftBalanceOf(data[9]?.result ?? BigInt(0))
        setvechrNftBalanceOf(data[10]?.result ?? BigInt(0))
      }
    })
  }

  return (
    <div className="flex flex-col items-center w-full gap-4 px-5 py-4 rounded-lg xl:w-2/4 2xl:w-2/3 md:flex-row bg-shark-400 bg-opacity-40">
      <div className="flex items-center gap-5 md:flex-row">
        <p className="text-sm text-shark-100">Wallet Address</p>
        <input
          className="px-3 py-1 text-xs md:text-sm border rounded-lg text-center text-shark-100 bg-shark-400 border-shark-300 truncate max-w-[200px]"
          type="text"
          value={account}
          onChange={(e) => setaccount(e.target.value.trim())}
        />
      </div>
      {account && (
        <Button className="!py-2 w-full md:w-auto" onClick={() => handlerMigrateCheck('success')}>
          Snapshot
        </Button>
      )}
      {account && (
        <Button className="!py-2 w-full md:w-auto" onClick={() => handlerMigrateCheck('wrong')}>
          Non Snapshot
        </Button>
      )}
      {migrateStatus === 'success' ? (
        <span className="text-2xl text-green-500 icon-check"></span>
      ) : migrateStatus === 'wrong' ? (
        <span className="text-2xl text-red-500 icon-x-circle"></span>
      ) : null}
    </div>
  )
}

export default AddressCheck
