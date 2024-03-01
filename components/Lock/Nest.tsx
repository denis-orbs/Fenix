'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TableHead, TableBody, TableCell, TableRow, Button, Pagination } from '@/components/UI'

interface NestProps {
  activePagination?: boolean
}

const Nest = ({ activePagination = true }: NestProps) => {
  const [loading, setLoading] = useState(true)
  const [activeAccordion, setActiveAccordion] = useState<{ [key: number]: boolean }>({})

  const handlerAccordion = (index: number) => {
    setActiveAccordion((prevState) => ({ ...prevState, [index]: !prevState[index] }))
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="relative hidden xl:block z-10">
      <div className="w-full mb-5">
        <TableHead
          items={[
            { text: 'Your Nests', className: 'text-left w-[50%] ', sortable: true },
            { text: 'APR ', className: 'w-[10%] text-center', sortable: true },
            { text: 'Reward', className: ' w-[10%]', sortable: true },
            { text: 'Voting Power', className: ' text-center w-[10%] ', sortable: true },
            { text: 'Action', className: 'text-right w-[20%]', sortable: false },
          ]}
        />

        <TableBody>
          <>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="w-[50%]">
                    <div className="flex gap-3 items-center">
                      <Button variant="tertiary" className="!px-3 !py-2 relative">
                        <span className="icon-lucide text-lg"></span>
                        <span className="bg-green-500 p-1 rounded-full absolute right-2 bottom-3"></span>
                      </Button>
                      <div className="flex flex-col text-center gap-2 ">
                        <div className="flex gap-2 items-center">
                          <h1 className="text-sm">veFNX Maxi</h1>{' '}
                          <p className="text-xs w-[71px] h-[21px] bg-shark-400 flex items-center justify-center rounded-lg border-shark-300 border">
                            ID 11230
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <p
                            className="text-xs flex justify-center items-center text-shark-100 w-[159px] h-[27px]
                        bg-shark-400 rounded-lg border-shark-300 border"
                          >
                            Updated 2 days ago
                          </p>
                          <p className="text-xs flex items-center justify-center text-shark-100 bg-shark-400 w-[111px] h-[27px] rounded-lg border border-shark-300">
                            0xc981...EF14f
                            <span className="icon-document"></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[10%] flex items-center justify-center ">
                    <h1 className="text-sm me-4">34.58%</h1>
                  </TableCell>
                  <TableCell className="w-[10%] flex  ">
                    <div className="flex items-center gap-2 me-4">
                      <Image
                        src={`/static/images/tokens/FNX.svg`}
                        alt="token"
                        className="rounded-full w-[20px] h-[20px]"
                        width={20}
                        height={20}
                      />
                      <p className="text-sm text-white">FNX</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-[10%] flex justify-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src={`/static/images/tokens/FNX.svg`}
                        alt="token"
                        className="rounded-full w-[20px] h-[20px]"
                        width={20}
                        height={20}
                      />
                      <p className="text-sm text-white">744,621.46</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-[20%] flex justify-end">
                    <div className="flex items-center gap-2">
                      <Button variant="tertiary" className="w-full h-[38px] !bg-opacity-40">
                        {' '}
                        <span className="text-sm">Deposit Lock</span>
                      </Button>
                      {activeAccordion[index] ? (
                        <span
                          onClick={() => {
                            handlerAccordion(index)
                          }}
                          className="icon-chevron rotate-180 cursor-pointer"
                        ></span>
                      ) : (
                        <span
                          onClick={() => {
                            handlerAccordion(index)
                          }}
                          className="icon-chevron cursor-pointer"
                        ></span>
                      )}
                    </div>
                  </TableCell>
                  {activeAccordion[index] && (
                    <div className="w-[93%] text-sm mx-auto border border-shark-400 p-2 rounded-lg">
                      <div className="text-white flex items-center justify-between  w-full">
                        <div className="flex gap-2 items-center">
                          <span className="icon-lock text-white"></span>
                          <p>Lock #11462</p>
                        </div>
                        <div className="flex gap-3">
                          <p>0.0</p>
                          <p>FNX locked for 3 years</p>
                        </div>
                        <div className="flex gap-3">
                          <p>0.0</p>
                          <p>FNX compouned</p>
                        </div>
                        <div>
                          <p>Withdraw available after first epoch</p>
                        </div>
                      </div>
                    </div>
                  )}
                </TableRow>
              )
            })}
          </>
        </TableBody>
      </div>
      {activePagination && (
        <div className="items-center hidden md:flex">
          <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
          <Pagination className="mx-auto" numberPages={7} />
          <div className="flex items-center justify-center w-12 h-12 px-4 cursor-pointer transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
            <span className="text-lg icon-cog text-white"></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Nest
