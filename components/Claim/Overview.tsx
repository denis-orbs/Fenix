/* eslint-disable max-len */
'use client'

import { useState } from 'react'
import Image from 'next/image'
import AddressCheck from './AddressCheck'
import TotalMigrated from './TotalMigrated'
import { TableHead, TableBody, TableCell, TableRow, Button, Pagination } from '@/components/UI'
import { TOKENS_LIST } from './data'

const Overview = () => {
  const [migrateStatus, setMigrateStatus] = useState<string | undefined>(undefined)

  return (
    <div className="relative">
      <h5 className="mb-4 text-lg text-white">Migration Overview</h5>
      <div className="flex md:items-center md:justify-between gap-5 mb-5 flex-col md:flex-row">
        <AddressCheck migrateStatus={migrateStatus} setMigrateStatus={setMigrateStatus} />
        <TotalMigrated />
      </div>

      {migrateStatus ? (
        <>
          <div className="w-full mb-10">
            <TableHead
              items={[
                { text: 'Token', className: 'text-left', sortable: true },
                { text: 'My Migrated Amount', className: 'md:max-w-[300px]', sortable: true },
                { text: 'Claimable Token', className: 'md:max-w-[300px]', sortable: true },
                { text: 'Action', className: 'hidden md:block md:max-w-[300px]', sortable: false },
              ]}
            />

            <TableBody>
              {TOKENS_LIST.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="w-1/3 md:w-1/4">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={`/static/images/tokens/${item.icon}.png`}
                        alt="token"
                        className="w-7 h-7 rounded-full"
                        width={20}
                        height={20}
                      />
                      <p className="text-white text-sm">{item.token}</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/3 md:w-1/4 2xl:max-w-[300px]">
                    <div className="flex w-full justify-end px-3 items-center">
                      <div className="flex gap-2">
                        <Image
                          src={`/static/images/tokens/${item.migrated.icon}.png`}
                          alt="token"
                          className="w-5 h-5 rounded-full"
                          width={20}
                          height={20}
                        />
                        <p className="text-white text-sm">{item.migrated.amount}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/3 md:w-1/4 2xl:max-w-[300px]">
                    <div className="flex w-full justify-end px-3 items-center">
                      <div className="flex gap-2">
                        <Image
                          src={`/static/images/tokens/${item.claimable.icon}.png`}
                          alt="token"
                          className="w-5 h-5 rounded-full"
                          width={20}
                          height={20}
                        />
                        <p className="text-white text-sm">{item.claimable.amount}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/3 md:w-1/4 2xl:max-w-[300px]">
                    <div className="flex w-full justify-end">
                      <Button variant="tertiary" className="w-full md:w-auto">
                        Claim not started
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </div>
          <div className="md:flex items-center hidden">
            <p className="text-sm text-shark-100 mb-5 md:mb-0">Showing 2 out of 2 migrations...</p>
            <Pagination className="mx-auto mb-5 md:mb-0" numberPages={7} />
            <div className="flex items-center justify-center px-4 border w-12 h-12 border-shark-300 bg-shark-400 bg-opacity-40 text-white flex-shrink-0 transition-colors hover:bg-outrageous-orange-400 rounded-lg">
              <span className="text-lg icon-cog"></span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center flex-col py-10 bg-shark-400 bg-opacity-40 rounded-lg">
          <span className="icon-send text-5xl text-shark-100"></span>
          <p className="text-shark-100 text-sm">No migrations or tokens found</p>
        </div>
      )}
    </div>
  )
}

export default Overview
