'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import RowSkeleton from '@/src/components/UI/Table/TableSkeleton'
import { TableHead, TableBody, TableCell, TableRow, Button, Pagination } from '@/src/components/UI'
import NotFoundLock from './NotFoundLock'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { AppThunkDispatch, useAppSelector } from '@/src/state'
import { fetchNftsAsync } from '@/src/state/lock/reducer'
import { useDispatch } from 'react-redux'
import { lockState } from '@/src/state/lock/types'
import formatDate from '@/src/library/utils/foramatDate'

type LOCK = {
  LOCK_ID: string
  STATUS: boolean
  VOTE: boolean
  TYPE?: string
}

interface MyLocksProps {
  activePagination?: boolean
  Locks: LOCK[]
}

const MyLocks = ({ activePagination = true, Locks }: MyLocksProps) => {
  const [nowTime, setnowTime] = useState<Number>(0)
  const { push } = useRouter()
  const router = useRouter()
  const { address } = useAccount()
  const dispatch = useDispatch<AppThunkDispatch>()
  const lock = useAppSelector<lockState>((state) => state.lock)
  const handlerNavigation = () => push('/lock/manage')

  useEffect(() => {
    if (address) dispatch(fetchNftsAsync(address))
    const now = new Date().getTime() / 1000
    setnowTime(now)
  }, [address])

  const handleManage = (id: Number) => {
    router.push(`lock/${id}`)
  }

  return (
    <>
      <div className="relative hidden xl:block z-10 xl:mb-5">
        <div className="w-full">
          <TableHead
            items={[
              { text: 'Lock ID', className: 'text-left w-[30%]', sortable: true },
              { text: 'Lock Amount', className: 'text-left w-[10%]', sortable: true },
              { text: 'Voting Power', className: 'text-left w-[10%]', sortable: true },
              { text: 'Unlock Date', className: 'text-left w-[10%]', sortable: true },
              { text: 'Vote Status', className: 'text-center w-[15%]', sortable: true },
              { text: 'Action', className: 'text-right w-[25%]', sortable: false },
            ]}
            setSort={() => {}}
            setSortIndex={() => {}}
            sort={null}
            sortIndex={1}
          />
          {lock.positions.length !== 0 ? (
            <>
              <TableBody>
                {lock.appState == 'loading' ? (
                  <>
                    {Array.from({ length: 1 }).map((_, index) => (
                      <RowSkeleton key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {lock.positions.map((lock, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="w-[30%]">
                            <div className="flex items-center gap-3">
                              <Image
                                src={'/static/images/vote/fenix-logo.svg'}
                                className="h-[40px] w-[40px]"
                                alt="alternative fenix"
                                width={40}
                                height={40}
                              />
                              <div className="flex flex-col items-center">
                                <h1 className="text-xs">{lock.veNFTInfo.id.toString()}</h1>
                                {BigInt(nowTime.toFixed(0).toString()) < lock.veNFTInfo.lockEnd ? (
                                  <p className="text-xs text-green-400">
                                    <span>•</span> Active
                                  </p>
                                ) : (
                                  <p className="text-xs text-red-700">
                                    <span>•</span> Expired
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="w-[10%]">
                            <div className="flex items-center gap-2">
                              <Image
                                src={`/static/images/tokens/FNX.svg`}
                                alt="token"
                                className="w-5 h-5 rounded-full"
                                width={20}
                                height={20}
                              />
                              <p className="text-xs text-white">
                                {(Number(lock.veNFTInfo.amount) / 10 ** 18).toFixed(2)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="w-[10%]">
                            <div className="flex items-center gap-2">
                              <Image
                                src={`/static/images/tokens/FNX.svg`}
                                alt="token"
                                className="w-5 h-5 rounded-full"
                                width={20}
                                height={20}
                              />
                              <p className="text-xs text-white">
                                {(Number(lock.veNFTInfo.voting_amount) / 10 ** 18).toFixed(2)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="w-[10%]">
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-white">{formatDate(Number(lock.veNFTInfo.lockEnd))}</p>
                            </div>
                          </TableCell>
                          <TableCell className="w-[15%] flex justify-center">
                            {lock.veNFTInfo.voted ? (
                              <span className="flex items-center bg-opacity-20 w-[105px] text-xs justify-center px-5 py-1 text-white border border-solid border-green-400 bg-green-500 rounded-xl ">
                                Voted
                              </span>
                            ) : (
                              <span className="flex items-center bg-opacity-20 w-[105px] text-xs justify-center px-5 py-1 text-white border border-solid border-red-600 bg-red-700 rounded-xl ">
                                Not Voted
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="w-[25%]">
                            <div className="flex justify-end w-full">
                              <Button
                                variant="tertiary"
                                className="h-[38px] w-[90px] bg-opacity-40"
                                onClick={() => handleManage(Number(lock.veNFTInfo.id))}
                              >
                                <span className="text-xs">Manage</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </>
                )}
              </TableBody>
              {activePagination && (
                <div className="items-center hidden md:flex">
                  <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
                  <Pagination
                    className="mx-auto"
                    numberPages={7}
                    activePage={1}
                    itemsPerPage={20}
                    setActivePage={() => {}}
                    setItemPerPage={() => {}}
                  />
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
                    <span className="text-lg text-white icon-cog cursor-pointer"></span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <NotFoundLock />
          )}
        </div>
      </div>
    </>
  )
}

export default MyLocks
