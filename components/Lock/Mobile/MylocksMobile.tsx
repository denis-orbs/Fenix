'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import RowSkeleton from '@/components/UI/Table/TableSkeleton'
import { TableBody, TableCell, TableRow, PaginationMobile, Button } from '@/components/UI'
import { LOCKS_INFO_API } from '../data'
import NotFoundLock from '../NotFoundLock'
import { useRouter } from 'next/navigation'

type LOCK = {
  LOCK_ID: string
  STATUS: boolean
  VOTE: boolean
}
interface MylocksMobileProps {
  activePagination?: boolean
  Locks: LOCK[]
}

const MylocksMobile = ({ activePagination = true, Locks }: MylocksMobileProps) => {
  const [loading, setLoading] = useState(true)
  const [accordion, setAccordion] = useState<{ [key: number]: boolean }>({})
  const { push } = useRouter()
  const handlerNavigation = () => push('/lock/manage')

  const handlerAccordion = (index: number) => {
    setAccordion((prevState) => ({ ...prevState, [index]: !prevState[index] }))
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="relative xl:hidden">
      <div className="w-full">
        {LOCKS_INFO_API.length !== 0 ? (
          <>
            <TableBody>
              {loading ? (
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <RowSkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {Locks.map((lock, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="flex-col  w-full">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Image
                                src={'/static/images/vote/fenix-logo.svg'}
                                className="h-[40px] w-[40px]"
                                alt="alternative fenix"
                                width={40}
                                height={40}
                              />
                              <div className="flex flex-col ">
                                {lock.STATUS ? (
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
                            <div>
                              <p className="text-sm text-shark-100">Unlock Date</p>
                              <p className="text-sm">24-06-2025</p>
                            </div>
                            <div>
                              <span
                                onClick={() => handlerAccordion(index)}
                                className={`cursor-pointer icon-chevron block  ${accordion[index] ? 'rotate-180' : ''}`}
                              ></span>
                            </div>
                          </div>
                          {accordion[index] && (
                            <>
                              <div className="flex flex-col gap-3 p-2 mt-5 text-xs">
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-col gap-1 items-center">
                                    <p className="text-shark-100">Lock Amount</p>
                                    <p className="flex gap-2 items-center">
                                      <Image src={'/static/images/vote/fenix-logo.svg'} alt="" height={17} width={17} />
                                      744,621.46
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-1 items-center">
                                    <p className="text-shark-100 text-center">Lock Amount</p>
                                    <p className="flex gap-2 items-center">
                                      <Image src={'/static/images/vote/fenix-logo.svg'} alt="" height={17} width={17} />
                                      744,621.46
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-shark-100 text-center mb-2">Vote Status</p>
                                    {lock.VOTE ? (
                                      <span className="flex items-center bg-opacity-20 w-[105px] text-xs justify-center px-5 py-1 text-white border border-solid border-green-400 bg-green-500 rounded-xl ">
                                        Voted
                                      </span>
                                    ) : (
                                      <span className="flex items-center bg-opacity-20 w-[105px] text-xs justify-center px-5 py-1 text-white border border-solid border-red-600 bg-red-700 rounded-xl ">
                                        Not Voted
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <Button onClick={handlerNavigation} variant="tertiary" className="w-full">
                                  Manage
                                </Button>
                              </div>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </>
              )}
            </TableBody>
            {activePagination && (
              <div className="mt-5">
                <PaginationMobile />
              </div>
            )}
          </>
        ) : (
          <NotFoundLock />
        )}
      </div>
    </div>
  )
}

export default MylocksMobile
