'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import RowSkeleton from '../Liquidity/RowSkeleton'
import { TableHead, TableBody, TableCell, TableRow, Button, Pagination } from '@/components/UI'

const Relay = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <h5 className="text-xl text-white">Relay</h5>
        <span className="text-xl text-white icon-info"></span>
      </div>
      <div className="w-full mb-10">
        <TableHead
          items={[
            { text: 'Relay ID', className: 'text-left w-[60%] ', sortable: true },
            { text: 'Rebase APR ', className: 'text-left w-[10%]', sortable: true },
            { text: 'Reward', className: 'text-left w-[10%]', sortable: true },
            { text: 'Voting Power', className: 'text-left w-[10%]', sortable: true },
            { text: 'Action', className: 'text-right w-[10%]', sortable: false },
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
            <TableRow>
              <TableCell className="w-[60%]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-shark-400">
                    <span className="icon-lucide"></span>
                  </div>
                  <div className="flex flex-col gap-2 text-center ">
                    <div className="flex items-center gap-2">
                      <h1 className="text-sm font-medium">veFNX Maxi</h1>
                      <p className="flex items-center justify-center px-3 py-1 text-xs text-white border rounded-full bg-shark-400 border-shark-300">
                        ID 11230
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p className="px-3 py-1 text-sm border rounded-full bg-shark-400 border-shark-300 text-shark-100">
                        Updated 2 days ago
                      </p>
                      <p className="px-3 py-1 text-sm border rounded-full bg-shark-400 border-shark-300 text-shark-100">
                        0xc981...EF14f
                        <span className="ml-1 text-xs cursor-pointer icon-copy"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="w-[10%]">
                <p className="text-sm">34.58%</p>
              </TableCell>
              <TableCell className="w-[10%]">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/static/images/tokens/FNX.png`}
                    alt="token"
                    className="w-5 h-5 rounded-full"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-white">FNX</p>
                </div>
              </TableCell>
              <TableCell className="w-[10%]">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/static/images/tokens/FNX.png`}
                    alt="token"
                    className="w-5 h-5 rounded-full"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-white">744,621.46</p>
                </div>
              </TableCell>
              <TableCell className="w-[10%]">
                <div className="flex justify-end w-full">
                  <Button variant="tertiary" className="w-[115px] h-[38px]">
                    <span className="text-xs">Deposit Lock</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </div>
      <div className="items-center hidden md:flex">
        <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
        <Pagination className="mx-auto" numberPages={7} />
        <div className="flex items-center justify-center w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
          <span className="text-lg text-white icon-cog"></span>
        </div>
      </div>
    </div>
  )
}

export default Relay
