/* eslint-disable max-len */
'use client'
import { useState } from 'react'
import Image from 'next/image'
import AddressCheck from '../AddressCheck'
import TotalMigrated from '../TotalMigrated'
import { TableHead, TableBody, TableCell, TableRow, Button } from '@/components/UI'
import { TOKENS_LIST } from '../data'

interface OverviewMobileProps {
  migrateStatus: string | undefined
  setMigrateStatus: (props: string | undefined) => void
}

const OverviewMobile = ({ migrateStatus, setMigrateStatus }: OverviewMobileProps) => {
  const [activeAccordion, setActiveAccordion] = useState<boolean>(false)

  const handlerActive = () => (activeAccordion ? setActiveAccordion(false) : setActiveAccordion(true))

  return (
    <div className="relative">
      <h5 className="mb-4 text-lg text-white">Migration Overview</h5>
      <div className="flex flex-col gap-5 mb-5 lg:hidden xl:hidden md:items-center md:justify-between xl:flex-row">
        <AddressCheck migrateStatus={migrateStatus} setMigrateStatus={setMigrateStatus} />
        <TotalMigrated />
      </div>

      {migrateStatus === 'success' && (
        <>
          <div className="w-full mb-10">
            <TableHead items={[{ text: 'Token', className: 'text-left w-[20%]', sortable: true }]} />

            <TableBody>
              {TOKENS_LIST.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex">
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center w-1/2 gap-2 px-3 py-[18px] rounded-lg bg-shark-400 bg-opacity-40">
                          <Image
                            src={`/static/images/tokens/${item.icon}.png`}
                            alt="token"
                            className="w-5 h-5 rounded-full"
                            width={40}
                            height={40}
                          />
                          <p className="text-xs text-white">{item.token}</p>
                        </div>
                        <div className="flex items-center w-1/2 gap-3">
                          <div className="flex flex-col justify-start w-full px-3 py-2 rounded-lg bg-shark-400 bg-opacity-40">
                            <p className="mb-1 text-xs text-shark-100 line-clamp-1">Mi Migrated Amount</p>
                            <div className="flex items-center gap-2">
                              <Image
                                src={`/static/images/tokens/${item.migrated.icon}.png`}
                                alt="token"
                                className="w-4 h-4 rounded-full"
                                width={20}
                                height={20}
                              />
                              <p className="text-sm text-white">{item.migrated.amount}</p>
                            </div>
                          </div>
                          <Button onClick={handlerActive} variant="tertiary" className="!py-4 !px-4">
                            <span
                              className={`text-sm flex items-center justify-center ${
                                activeAccordion ? 'icon-chevron rotate-180' : 'icon-chevron'
                              }`}
                            ></span>
                          </Button>
                        </div>
                      </div>
                      {activeAccordion && (
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between gap-2 py-2">
                            <div className="flex flex-col w-1/2 px-3 py-2 rounded-lg bg-shark-400 bg-opacity-40">
                              <p className="text-xs text-shark-100 line-clamp-1">Mi Migrated Amount</p>
                              <div className="flex gap-2">
                                <Image
                                  src={`/static/images/tokens/${item.migrated.icon}.png`}
                                  alt="token"
                                  className="w-5 h-5 rounded-full"
                                  width={20}
                                  height={20}
                                />
                                <p className="text-sm text-white">{item.migrated.amount}</p>
                              </div>
                            </div>
                            <div className="flex flex-col w-1/2 px-3 py-2 rounded-lg bg-shark-400 bg-opacity-40">
                              <p className="text-xs text-shark-100 line-clamp-1">Mi Migrated Amount</p>
                              <div className="flex gap-2">
                                <Image
                                  src={`/static/images/tokens/${item.migrated.icon}.png`}
                                  alt="token"
                                  className="w-5 h-5 rounded-full"
                                  width={20}
                                  height={20}
                                />
                                <p className="text-sm text-white">{item.migrated.amount}</p>
                              </div>
                            </div>
                          </div>
                          <Button variant="tertiary" className="w-full">
                            Claim not started
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </div>
          <div className="flex items-center justify-between text-sm ">
            <div className="flex items-center gap-2">
              <div className="flex gap-2 bg-shark-400 bg-opacity-40 rounded-lg w-[168px] h-[42px] text-white items-center justify-center">
                <div>
                  <p>10 Row</p>
                </div>
                <div className="h-[20px] w-[2px] bg-orange-600"></div>
                <div>
                  <p>1-10 of 186</p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 px-4 text-white transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
                <span className="text-lg icon-cog"></span>
              </div>
            </div>

            <div className="flex">
              <Image src={'/static/images/claim/PaginationArrowInactive.svg'} alt="" height={20} width={20} />
              <Image src={'/static/images/claim/PaginationArrowActive.svg'} alt="" height={20} width={20} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OverviewMobile
