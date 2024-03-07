// @ts-nocheck

'use client'

import React, { useState, useEffect } from 'react'
import { Button, Modal } from '../UI'
import { useContractWrite } from 'wagmi'
import toast, { Toaster } from 'react-hot-toast'
import { multicall } from '@wagmi/core'
import BigNumber from 'bignumber.js'

interface ABI {
  inputs?: {
    internalType?: string
    name?: string
    type?: string
  }[]
  name?: string
  outputs?: {
    internalType?: string
    name?: string
    type?: string
  }[]
  stateMutability?: string
  type?: string
  anonymous?: boolean
  indexed?: boolean
}

interface Item {
  token: string
  abi?: ABI[]
  address: string
  migrateAddress: string
  migrateabi?: ABI[]
  icon: string
  migrated: {
    amount: number
    icon: string
  }
  claimable: {
    amount: number
    icon: string
  }
}

interface DepositModalProp {
  open: Boolean | undefined
  item: Item | undefined
  setOpenModal: (openModal: boolean) => void
  acc: string | undefined
  migrateAmount: string | undefined
  migrateStatus: string | undefined
}

const DepositModal = ({ open, setOpenModal, item, acc, migrateAmount, migrateStatus }: DepositModalProp) => {
  const handleClose = () => setOpenModal(false)
  const [depositAmount, setdepositAmount] = useState('0')
  const [tokenIds, settokenIds] = useState([])
  const [isDeposited, setisDeposited] = useState([])
  const [balance, setBalance] = useState(0)
  const [depositiserror, setdepositiserror] = useState(false)

  const {
    writeAsync: handleDeposit,
    isLoading: depositIsLoading,
    isSuccess: depositIsSuccess,
    data: depositData,
    error: depositError,
    isError: depositIsError,
  } = useContractWrite({
    address: item.migrateAddress,
    abi: item.migrateabi,
    functionName: migrateStatus === 'success' ? 'deposit' : 'depositnsh',
    args:
      item.token === 'CHR' || item.token === 'spCHR' || item.token === 'elCHR'
        ? [BigInt(depositAmount) * 10n ** 18n]
        : [BigInt(depositAmount)],
  })

  const {
    writeAsync: handleapproval,
    isLoading: approvalIsLoading,
    isSuccess: approvalIsSuccess,
    data: approvalData,
    error: approvalError,
    isError: approvalIsError,
  } = useContractWrite({
    address: item.address,
    abi: item.abi,
    functionName: 'approve',
    args:
      item.token === 'CHR' || item.token === 'spCHR' || item.token === 'elCHR'
        ? [item.migrateAddress, BigInt(depositAmount) * 10n ** 18n]
        : [item.migrateAddress, BigInt(depositAmount)],
  })
  const handlerdepositCheck = async () => {
    try {
      await handleapproval().then(async (res) => {
        try {
          await handleDeposit()
        } catch (err) {}
      })
    } catch (err) {}
  }
  useEffect(() => {
    if (item.token === 'veCHR' || item.token === 'chrNFT') {
      if (migrateStatus === 'success' && item.token === 'veCHR') {
        multicall({
          contracts: [
            {
              abi: item.migrateabi,
              address: item.migrateAddress,
              functionName: 'totalids',
              args: [acc],
            },
          ],
        }).then((data) => {
          const nftcontractsArray = []
          const nftids = []
          if (data) {
            for (let i = 0; i < data[0]?.result ?? 0; i++) {
              nftcontractsArray.push({
                abi: item.migrateabi,
                address: item.migrateAddress,
                functionName: 'addressToNftIds',
                args: [acc, i],
              })
            }

            multicall({
              contracts: [...nftcontractsArray],
            }).then((ids) => {
              for (let i = 0; i < ids.length; i++) {
                nftids.push(ids[i]?.result)
              }
              const deposited = []
              const depositedIds = []

              for (let i = 0; i < ids.length ?? 0; i++) {
                deposited.push({
                  abi: item.migrateabi,
                  address: item.migrateAddress,
                  functionName: 'deposited',
                  args: [parseInt(ids[i]?.result), acc],
                })
              }
              multicall({
                contracts: [...deposited],
              }).then((deposit) => {
                for (let i = 0; i < ids.length; i++) {
                  depositedIds.push(deposit[i]?.result)
                }
                const filteredArray = nftids.map((value, index) => {
                  if (!depositedIds[index]) {
                    return value
                  }
                })
                settokenIds(filteredArray)
              })

              setisDeposited(depositedIds)
            })
          }
        })
      } else {
        multicall({
          contracts: [
            {
              abi: item.abi,
              address: item.address,
              functionName: 'balanceOf',
              args: [acc],
            },
          ],
        }).then((data) => {
          const nftcontractsArray = []
          const nftids = []
          if (data) {
            for (let i = 0; i < data[0]?.result ?? 0; i++) {
              nftcontractsArray.push({
                abi: item.abi,
                address: item.address,
                functionName: 'tokenOfOwnerByIndex',
                args: [acc, i],
              })
            }

            multicall({
              contracts: [...nftcontractsArray],
            }).then((ids) => {
              for (let i = 0; i < ids.length; i++) {
                nftids.push(ids[i]?.result)
              }
              settokenIds(nftids)
            })
          }
        })
      }
    } else {
      const balanceOf = multicall({
        contracts: [
          {
            abi: item.abi,
            address: item.address,
            functionName: 'balanceOf',
            args: [acc],
          },
        ],
      }).then((data) => {
        setBalance(parseInt(new BigNumber(data[0]?.result).dividedBy(10 ** 18)))
      })
    }
  }, [item])

  useEffect(() => {
    if (approvalIsError) {
      toast(`${approvalError?.cause}`)
    }
    if (depositIsError) {
      toast(`${depositError?.cause}`)
    }
    if (approvalIsLoading) {
      toast(`Loading approval tx...`)
    }
    if (depositIsLoading) {
      toast(`Loading Migration tx...`)
    }
    if (approvalIsSuccess) {
      toast(`Submitted approval tx Successfully`)
    }
    if (depositIsSuccess) {
      toast(`Submitted Migration tx Successfully`)
    }
  }, [approvalIsError, depositIsError, approvalIsLoading, depositIsLoading, approvalIsSuccess, depositIsSuccess])

  return (
    <Modal className="justify-center" openModal={open}>
      <div className="xl:w-[603px] bg-shark-400 bg-opacity-40 text-white py-[50px] relative xl:mx-auto rounded-2xl">
        <button
          className="absolute z-10 text-2xl cursor-pointer top-5 right-5 text-shark-100 hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text"
          type="button"
          aria-label="Close Modal"
          title="Close"
          onClick={handleClose}
        >
          <span className="icon-x"></span>
        </button>
        <div className="p-5 text-center">
          <div className="w-100 my-2">
            <input
              className="me-8 px-3 py-1 text-xs md:text-sm border rounded-lg text-center text-shark-100 bg-shark-400 border-shark-300 truncate max-w-[200px]"
              type="text"
              value={depositAmount}
              onChange={(e) => setdepositAmount(e.target.value)}
            />
            <div
              onClick={() => {
                if (migrateAmount >= balance) setdepositAmount(balance)
                else setdepositAmount(migrateAmount)
              }}
            >
              <label>
                {item.token === 'CHR' || item.token === 'spCHR' || item.token === 'elCHR'
                  ? 'Balance:'
                  : item.token == 'veCHR' || item.token === 'chrNFT'
                    ? 'TokenIds:'
                    : 'TokenIds:'}
              </label>
              <label>
                {' '}
                {item.token === 'CHR' || item.token === 'spCHR' || item.token === 'elCHR'
                  ? balance
                  : item.token === 'veCHR' || item.token === 'chrNFT'
                    ? tokenIds.join(',')
                    : null}
              </label>
            </div>
          </div>
          <div className="w-100 flex justify-center items-center my-5">
            <Button onClick={handlerdepositCheck}>
              {approvalIsLoading ? 'Approving...' : depositIsLoading ? 'Migrating...' : 'Migrate'}
            </Button>
            <Toaster />
          </div>
        </div>
      </div>
      {depositiserror ? toast(`${depositError?.cause}`) : null}
    </Modal>
  )
}

export default DepositModal