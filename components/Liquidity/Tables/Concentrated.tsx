/* eslint-disable max-len */
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import RowSkeleton from '../RowSkeleton'
import { TableHead, TableBody, TableCell, TableRow, Button, Pagination } from '@/components/UI'

const Concentrated = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])


  return (
    <div className="relative">
     
      <div className="hidden w-full mb-10 md:block">
        <TableHead
          items={[
            { text: 'Pair', className: 'w-[30%]', sortable: true },
            { text: 'APR', className: 'text-center  w-[10%]', sortable: true },
            { text: 'TVL', className: 'w-[15%] text-right', sortable: true },
            { text: 'Volume', className: 'w-[15%] text-right', sortable: true },
            { text: 'Fees', className: 'w-[15%] text-right', sortable: true },
            { text: 'Action', className: 'w-[15%] text-right', sortable: true },
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
              <TableCell className='w-[30%]'>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Image
                      src="/static/images/tokens/FNX.png"
                      alt="token"
                      className="rounded-full w-7 h-7"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/static/images/tokens/ETH.png"
                      alt="token"
                      className="-ml-4 rounded-full w-7 h-7"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-sm text-white">FNX / ETH</h5>
                    <div className="flex items-center gap-2">
                      <Button variant="tertiary" className="!py-1
                      hover:!border-none
                      !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 ">
                          Concentrated
                      </Button>
                      <Button variant="tertiary" className="!py-1">
                        0.3%
                      </Button>
                      <Button variant="tertiary" className="!py-1">
                        <span className="icon-info"></span>
                      </Button>
                    </div>
                  </div>
                </div>
              </TableCell>
              {/* firts */}
              <TableCell className="w-[10%]">
                <div className="flex items-center ">
                  <p className="text-sm text-white bg-shark-400 p-2 rounded-xl bg-opacity-40 border border-solid border-1 border-shark-300">34.58%</p>
                  
                </div>
              </TableCell>
              {/* second */}
              <TableCell className="w-[15%]">
                <div className="flex flex-col items-end justify-end w-full px-3">
                  <p className="mb-1 text-sm text-white">$1,289.863.54</p>
                  <div className="flex items-center gap-4">
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
              {/* third */}
              <TableCell className="w-[15%]">
                <div className="flex flex-col items-end justify-end w-full px-3">
                  <p className="mb-1 text-sm text-white">$539.863.54</p>
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
              {/* fourth */}
              <TableCell className="w-[15%]">
                <div className="flex flex-col items-end justify-end w-full px-3">
                  <p className="mb-1 text-sm text-white">$98.751.23</p>
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
              {/* fifth */}
              <TableCell className="flex justify-end w-[15%]">
                <div className='flex gap-2'>
                  
                <Button variant="tertiary" className="flex items-center gap-2">
                    <span className="icon-info"></span>
                    Info
                  </Button>
                  <Button variant="tertiary" className="flex items-center gap-2">
                    <span className="icon-circles"></span>
                    Deposit
                  </Button>
                </div>
              </TableCell>
              {/* sixth */}
            </TableRow>
          )}
        </TableBody>
      </div>
      <div className="items-center hidden md:flex">
        <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
        <Pagination className="mx-auto" numberPages={7} />
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 px-4 text-white transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
          <span className="text-lg icon-cog"></span>
        </div>
      </div>
    </div>
  )
}

export default Concentrated
