'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import RowSkeleton from '@/components/UI/Table/TableSkeleton'
import { TableHead, TableBody, TableCell, TableRow, Button, Pagination } from '@/components/UI'

interface MyLocksProps {
  activePagination?: boolean
}

const MyLocks = ({ activePagination = true }: MyLocksProps) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="relative hidden xl:block z-10 xl:mb-5">
      <div className="w-full">
        <TableHead
          items={[
            { text: 'Lock ID', className: 'text-left w-[30%]', sortable: true },
            // { text: 'Rebase APR ', className: 'text-center w-[10%]', sortable: true },
            { text: 'Lock Amount', className: 'text-left w-[10%]', sortable: true },
            { text: 'Voting Power', className: 'text-left w-[10%]', sortable: true },
            { text: 'Unlock Date', className: 'text-left w-[10%]', sortable: true },
            { text: 'Vote Status', className: 'text-center w-[15%]', sortable: true },
            { text: 'Action', className: 'text-right w-[25%]', sortable: false },
          ]}
        />

        <TableBody>
          {loading ? (
            <>
              {Array.from({ length: 1 }).map((_, index) => (
                <RowSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, index) => {
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
                          <h1 className="text-sm">10923</h1>
                          <p className="text-sm text-green-400">
                            <span>•</span> Active
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    {/* firts */}
                    {/* <TableCell className="w-[10%]  flex items-center justify-center">
                  <p className="text-sm">34.58%</p>
              </TableCell> */}
                    {/* second */}
                    <TableCell className="w-[10%]">
                      <div className="flex items-center gap-2">
                        <Image
                          src={`/static/images/tokens/FNX.svg`}
                          alt="token"
                          className="w-5 h-5 rounded-full"
                          width={20}
                          height={20}
                        />
                        <p className="text-sm text-white">744,621.46</p>
                      </div>
                    </TableCell>
                    {/* third */}
                    <TableCell className="w-[10%]">
                      <div className="flex items-center gap-2">
                        <Image
                          src={`/static/images/tokens/FNX.svg`}
                          alt="token"
                          className="w-5 h-5 rounded-full"
                          width={20}
                          height={20}
                        />
                        <p className="text-sm text-white">744,621.46</p>
                      </div>
                    </TableCell>
                    {/* fourth */}
                    <TableCell className="w-[10%]">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-white">27-06-2025</p>
                      </div>
                    </TableCell>
                    {/* fifth */}
                    <TableCell className="w-[15%] flex justify-center">
                      <span
                        className="flex items-center bg-opacity-20 w-[105px] text-sm justify-center px-5 py-1
                 text-white border border-solid border-green-400
                 bg-green-500
                 rounded-xl "
                      >
                        Voted
                      </span>
                    </TableCell>
                    {/* sixth */}
                    <TableCell className="w-[25%]">
                      <div className="flex justify-end w-full">
                        <Button variant="tertiary" className="h-[38px] w-[90px] bg-opacity-40">
                          <span className="text-sm">Manage</span>
                        </Button>
                      </div>
                    </TableCell>
                    {/* seventh */}
                  </TableRow>
                )
              })}
            </>
          )}
        </TableBody>
      </div>

      {activePagination && (
        <div className="items-center hidden md:flex">
          <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
          <Pagination className="mx-auto" numberPages={7} />
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
            <span className="text-lg text-white icon-cog cursor-pointer"></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyLocks
