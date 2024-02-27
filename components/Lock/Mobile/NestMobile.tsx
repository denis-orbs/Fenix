'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import RowSkeleton from '@/components/UI/Table/TableSkeleton'
import { TableBody, TableCell, TableRow, PaginationMobile, Button } from '@/components/UI'

const NestMobile = () => {
  const [loading, setLoading] = useState(true)
  const [accordion, setAccordion] = useState(false)

  const handlerAccordion = () => (accordion ? setAccordion(false) : setAccordion(true))
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="relative mt-5">
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
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 rounded-lg bg-shark-400 flex bg-opacity-40 items-center justify-center">
                          <span className="icon-lucide text-xl "></span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2 items-center">
                            <h1 className="text-sm">veFNX Maxi</h1>{' '}
                            <p className="text-xs bg-shark-400 flex items-center justify-center rounded-lg py-1 px-3 border-shark-300 border-solid border-2">
                              ID 11230
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-xs flex justify-center items-center text-shark-100 bg-shark-400 py-1 px-3 rounded-lg border-shark-100 border-solid border">
                              Updated 2 days ago
                            </p>
                            <p className="text-xs flex items-center justify-center text-shark-100 bg-shark-400 py-1 px-3 rounded-lg border-[#53606A] border-solid border">
                              0xc981...EF14f
                              <span className="icon-document ml-1 cursor-pointer"></span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span
                          onClick={handlerAccordion}
                          className={`icon-chevron block  ${accordion ? 'rotate-180' : ''}`}
                        ></span>
                      </div>
                    </div>
                    {accordion && (
                      <>
                        <div className="flex flex-col gap-3 p-2 mt-5 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <p className="text-shark-100">Rebase APR</p>
                              <p className="flex">34.58%</p>
                            </div>
                            <div>
                              <p className="text-shark-100 text-center">Rewards</p>
                              <p className="flex gap-2">
                                <Image src={'/static/images/vote/fenix-logo.svg'} alt="" height={17} width={17} />
                                FNX
                              </p>
                            </div>
                            <div>
                              <p className="text-shark-100 text-center">Voting Power</p>
                              <p className="flex">
                                <Image src={'/static/images/vote/fenix-logo.svg'} alt="" height={17} width={17} />
                                744,621.46
                              </p>
                            </div>
                          </div>
                          <Button variant="tertiary" className="w-full flex gap-4">
                            Deposit Lock <span className="icon-link text-xlg"></span>
                          </Button>
                          <div className="flex flex-col gap-2 border border-shark-100 rounded-lg p-2">
                            <div>
                              <p className="text-shark-100 flex gap-2 text-sm">
                                <span className="icon-lock"></span>Lock #11462
                              </p>
                            </div>
                            <div className="text-sm text-white flex-col flex gap-2">
                              <p>0.0 FNX locked for 3 years</p>
                              <p>0.0 FNX compouned</p>
                              <p>Withdraw available after first epoch</p>
                            </div>
                          </div>
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

export default NestMobile
