/* eslint-disable max-len */
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Search from '@/components/Common/Search'
import Filter from '@/components/Common/Filter'
import RowSkeleton from './RowSkeleton'
import { TableHead, TableBody, TableCell, TableRow, Button, Pagination } from '@/components/UI'

const Pool = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])


  return (
    <div className="relative">
      <h5 className="mb-4 text-lg text-white">Liquidity Pools</h5>
      <div className="flex items-center justify-between gap-5 mb-10">
        <Filter />
        <Search />
      </div>
      <div className="w-full mb-10">
        <TableHead
          items={[
            { text: 'Liquidity Pool', className: 'text-left', sortable: true },
            { text: 'APR', className: 'max-w-[260px]', sortable: true },
            { text: 'TVL', className: 'max-w-[260px]', sortable: true },
            { text: 'Volume', className: 'max-w-[260px]', sortable: true },
            { text: 'Fees', className: 'max-w-[260px]', sortable: true },
            { text: 'Pool Balance', className: '', sortable: true },
          ]}
        />

        <TableBody>
          {loading ? (
            <>
              {Array.from({ length: 1 }).map((_, index) => (
                <RowSkeleton key={index}/>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center">
                    <Image
                      src="/static/images/tokens/FNX.png"
                      alt="token"
                      className="w-7 h-7 rounded-full"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/static/images/tokens/ETH.png"
                      alt="token"
                      className="w-7 h-7 rounded-full -ml-4"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-sm text-white">FNX / ETH</h5>
                    <div className="flex items-center gap-2">
                      <Button variant="tertiary" className="!py-1">
                        Volatile Pool
                      </Button>
                      <Button variant="tertiary" className="!py-1">
                        0.3%
                      </Button>
                      <Button variant="tertiary" className="!py-1">
                        <span className="icon-document"></span>
                      </Button>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="max-w-[260px]">
                <div className="flex flex-col justify-end w-full px-3 items-end">
                  <p className="text-white text-sm">34.58%</p>
                  <p className="flex items-center gap-3 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
                    <span className="text-lg icon-link"></span>
                    Add Incentives
                  </p>
                </div>
              </TableCell>
              <TableCell className="max-w-[260px]">
                <div className="flex flex-col justify-end w-full px-3 items-end">
                  <p className="text-white text-sm mb-1">$1,289.863.54</p>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center gap-2 text-sm text-shark-100">
                      <Image
                        src="/static/images/tokens/FNX.png"
                        alt="token"
                        className="w-5 h-5 rounded-full"
                        width={20}
                        height={20}
                      />
                      2,313,873.46
                    </p>
                    <p className="flex items-center gap-2 text-sm text-shark-100">
                      <Image
                        src="/static/images/tokens/ETH.png"
                        alt="token"
                        className="w-5 h-5 rounded-full"
                        width={20}
                        height={20}
                      />
                      225.38
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="max-w-[260px]">
                <div className="flex flex-col justify-end w-full px-3 items-end">
                  <p className="text-white text-sm mb-1">$539.863.54</p>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center gap-2 text-sm text-shark-100">
                      <Image
                        src="/static/images/tokens/FNX.png"
                        alt="token"
                        className="w-5 h-5 rounded-full"
                        width={20}
                        height={20}
                      />
                      744,621.46
                    </p>
                    <p className="flex items-center gap-2 text-sm text-shark-100">
                      <Image
                        src="/static/images/tokens/ETH.png"
                        alt="token"
                        className="w-5 h-5 rounded-full"
                        width={20}
                        height={20}
                      />
                      132.49
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="max-w-[260px]">
                <div className="flex flex-col justify-end w-full px-3 items-end">
                  <p className="text-white text-sm mb-1">$98.751.23</p>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center gap-2 text-sm text-shark-100">
                      <Image
                        src="/static/images/tokens/FNX.png"
                        alt="token"
                        className="w-5 h-5 rounded-full"
                        width={20}
                        height={20}
                      />
                      82,334.52
                    </p>
                    <p className="flex items-center gap-2 text-sm text-shark-100">
                      <Image
                        src="/static/images/tokens/ETH.png"
                        alt="token"
                        className="w-5 h-5 rounded-full"
                        width={20}
                        height={20}
                      />
                      132.49
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="">
                <div className="w-full px-3 flex gap-2 justify-between">
                  <div className="flex items-end flex-col">
                    <p className="text-white text-sm mb-1">$1,453,987.34</p>
                    <div className="flex items-center gap-2">
                      <p className="flex items-center gap-2 text-sm text-shark-100">
                        <Image
                          src="/static/images/tokens/FNX.png"
                          alt="token"
                          className="w-5 h-5 rounded-full"
                          width={20}
                          height={20}
                        />
                        2,622,443.52
                      </p>
                      <p className="flex items-center gap-2 text-sm text-shark-100">
                        <Image
                          src="/static/images/tokens/ETH.png"
                          alt="token"
                          className="w-5 h-5 rounded-full"
                          width={20}
                          height={20}
                        />
                        234.34
                      </p>
                    </div>
                  </div>
                  <Button variant="tertiary" className="flex items-center gap-2">
                    <span className="icon-circles"></span>
                    Deposit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
        <Pagination className="mx-auto" numberPages={7} />
        <div className="flex items-center justify-center px-4 border w-12 h-12 border-shark-300 bg-shark-400 bg-opacity-40 text-white flex-shrink-0 transition-colors hover:bg-outrageous-orange-400 rounded-lg">
          <span className="text-lg icon-cog"></span>
        </div>
      </div>
    </div>
  )
}

export default Pool
