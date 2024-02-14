
'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
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
      <div className='flex items-center gap-3'>
        <h5 className=" text-[24px] text-white ms-2">Relay</h5>
        <Image className='mt-1' src={'/static/images/LocksIcons/Information.svg'} alt="" width={18} height={18} />
      </div>
      <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row"></div>
      <div className="w-full mb-10">
        <TableHead
          items={[
            { text: 'Relay ID', className: 'text-left w-[60%] ', sortable: true },
            { text: 'Rebase APR ', className: 'text-left w-[10%]', sortable: true },
            { text: 'Reward', className: 'text-left w-[10%]', sortable: true },
            { text: 'Voting Power', className: 'text-left w-[10%]', sortable: true },
            { text: 'Action', className: 'text-left w-[10%]', sortable: false },
          ]}
        />

        <TableBody>
          <TableRow>
            <TableCell className="w-[60%]">
              <div className="flex gap-3 items-center">
                <Button variant="tertiary" className="w-[40px]">
                  <span className="icon-lucide w-[20px] h-[20px]"></span>
                </Button>
                <div className="flex flex-col text-center gap-2 ">
                  <div className="flex gap-2 items-center">
                    <h1 className="text-[14px] font-bold">veFNX Maxi</h1>{' '}
                    <p className="text-[12px] w-[71px] h-[21px] bg-[#343C45] flex items-center justify-center rounded rounded-lg  border-[#53606A] border-solid border-2">
                      ID 11230
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <p
                      className="text-[12px] text-[#53606A] w-[159px] h-[27px]
                    bg-[#343C45]  rounded-lg  border-[#53606A] border-solid border-2"
                    >
                      Updated 2 days ago
                    </p>
                    <p className="text-[12px] text-[#53606A] bg-[#343C45] w-[111px] h-[27px] rounded-lg border border-[#53606A] border-solid border-1">
                      0xc981...EF14f
                    </p>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="w-[10%]">
              <div className="flex items-center">
                <h1 className="text-[12px]">34.58%</h1>
              </div>
            </TableCell>
            <TableCell className="w-[10%]">
              <div className="flex items-center gap-2">
                <Image
                  src={`/static/images/tokens/FNX.png`}
                  alt="token"
                  className="rounded-full w-[20px] h-[20px]"
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
                  className="rounded-full w-[20px] h-[20px]"
                  width={20}
                  height={20}
                />
                <p className="text-sm text-white">744,621.46</p>
              </div>
            </TableCell>
            <TableCell className="w-[10%]">
              <div className="flex items-center gap-2">
                <Button variant="tertiary" className="w-[115px] h-[38px]">
                  {' '}
                  <span className="text-[12px]">Deposit Lock</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </div>
      <div className="items-center hidden md:flex">
        <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
        <Pagination className="mx-auto" numberPages={7} />
        <div
          className="flex items-center justify-center flex-shrink-0 w-12 h-12 px-4
             text-white transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400"
        >
          <span className="text-lg icon-cog"></span>
        </div>
      </div>
    </div>
  )
}

export default Relay
