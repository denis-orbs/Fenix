'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import RowSkeleton from '@/components/UI/Table/TableSkeleton'
import { TableBody, TableCell, TableRow, PaginationMobile, Button } from '@/components/UI'

const MylocksMobile = () => {
  const [loading, setLoading] = useState(true)
  const [accordion, setAccordion] = useState(false)

  const handlerAccordion = () => (accordion ? setAccordion(false) : setAccordion(true))
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="relative">
      <div className="w-full">
        <TableBody>
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <RowSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
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
                          <p className="text-sm">10923</p>
                          <p className="text-sm text-red-600">• Inactive</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-shark-100">Unlock Date</p>
                        <p className="text-sm">24-06-2025</p>
                      </div>
                      <div>
                        <span
                          onClick={handlerAccordion}
                          className={`cursor-pointer icon-chevron block  ${accordion ? 'rotate-180' : ''}`}
                        ></span>
                      </div>
                    </div>
                    {accordion && (
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
                              <Button
                                variant="secondary"
                                className="button button-tertiary !py-1 hover:!border-none
                               !bg-green-500 !border-solid !border-1 !border-green-400 !bg-opacity-40"
                              >
                                Voted
                              </Button>
                            </div>
                          </div>
                          <Button variant="tertiary" className="w-full">
                            Mange
                          </Button>
                        </div>
                      </>
                    )}
                  </TableCell>
                  {/* firts */}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </div>
      <div className="mt-5">
        <PaginationMobile />
      </div>
    </div>
  )
}

export default MylocksMobile
