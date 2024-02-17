/* eslint-disable max-len */
'use client'
import { useState } from 'react'
import Image from 'next/image'
import AddressCheck from '../AddressCheck'
import TotalMigrated from '../TotalMigrated'
import { TableHead, TableBody, TableCell, TableRow, Button, Pagination } from '@/components/UI'
import { TOKENS_LIST } from '../data'

interface OverviewMobileProps {

    migrateStatus: string | undefined,
    setMigrateStatus: (props:string | undefined)=> void
}

const OverviewMobile = ({ migrateStatus, setMigrateStatus } :OverviewMobileProps) => {
  const [activeAccordion, setActiveAccordion] = useState<boolean>(false)

  const handlerActive = () => (activeAccordion ? setActiveAccordion(false) : setActiveAccordion(true))

  return (
    <div className="relative">
      <h5 className="mb-4 text-lg text-white">Migration Overview</h5>
      <div className="flex flex-col block lg:hidden xl:hidden gap-5 mb-5 md:items-center md:justify-between xl:flex-row">
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
                      <div className="flex  justify-between">
                        <div className="flex gap-4">
                          <div className="flex  items-center gap-2">
                            <Image
                              src={`/static/images/tokens/${item.icon}.png`}
                              alt="token"
                              className="rounded-full w-[40px] h-[40px]"
                              width={40}
                              height={40}
                            />
                            <p className="text-sm text-white">{item.token}</p>
                          </div>
                          {/* firts section */}
                          <div
                            className="bg-shark-300  flex justify-start   
                        rounded-lg bg-opacity-30 flex-col h-[51px] w-[150px]"
                          >
                            <p className="text-[11px] text-shark-100 ms-2">Mi Migrated Amount</p>
                            <div className="flex gap-2 ms-2">
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
                          {/* second section */}
                        </div>
                        <div className="flex ms-2 items-center">
                          <Button
                            onClick={handlerActive}
                            variant="tertiary"
                            className="transition duration-150 delay-150"
                          >
                            {activeAccordion ? (
                              <Image
                                src={'/static/images/claim/arrowUp.svg'}
                                className="h-[16px] w-[16px]"
                                alt="arrow"
                                height={16}
                                width={16}
                              />
                            ) : (
                              <Image
                                src={'/static/images/claim/arrowDown.svg'}
                                className="h-[16px] w-[16px]"
                                alt="arrow"
                                height={16}
                                width={16}
                              />
                            )}
                          </Button>
                        </div>
                        {/* button right section */}
                      </div>
                      {activeAccordion && (
                        <div className="flex flex-col transition duration-150">
                          <div className="flex gap-2 justify-center items-center mt-5">
                            <div className="flex">
                              <div
                                className="bg-shark-300  flex    
                        rounded-lg bg-opacity-30 flex-col h-[51px] w-[140px] "
                              >
                                <p className="text-[12px] text-shark-100 ms-2">Mi Migrated Amount</p>
                                <div className="flex gap-2 ms-2">
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
                            <div className="flex">
                              <div
                                className="bg-shark-300  flex justify-start   
                        rounded-lg bg-opacity-30 flex-col h-[51px] w-[150px] "
                              >
                                <p className="text-[12px] text-shark-100 ms-2">Mi Migrated Amount</p>
                                <div className="flex gap-2 ms-2">
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
                          </div>
                          <Button variant="tertiary" className="w-full h-[38px] mt-3 !text-left ">
                            <span className="text-shark-100 text-left">Claim not started</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </div>
          <div className=" flex  items-center justify-between text-[12px]">
            <div className='flex gap-2 items-center'>
              <div className="flex gap-2 bg-shark-300 rounded-lg bg-opacity-30 w-[168px] h-[42px] text-white items-center justify-center">
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

      {migrateStatus === undefined && (
        <>
          <div className="flex flex-col items-center justify-center py-10 rounded-lg bg-shark-400 bg-opacity-40">
            <span className="text-5xl icon-send text-shark-100"></span>
            <p className="text-sm text-shark-100">No migrations or tokens found</p>
          </div>
        </>
      )}
      {migrateStatus === 'wrong' && (
        <>
          <div className="w-full mb-10">
            <TableHead items={[{ text: 'Tokens', className: 'text-left w-[100%]', sortable: true }]} />

            <TableBody>
              {TOKENS_LIST.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[13%] ">
                    <div className="flex items-center gap-2">
                      <Image
                        src={`/static/images/tokens/${item.icon}.png`}
                        alt="token"
                        className="rounded-full w-[40px] h-[40px]"
                        width={40}
                        height={40}
                      />
                      <p className="text-sm text-white">{item.token}</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-[50%]">
                    <div className="flex  w-full ">
                      <div className="bg-shark-300  flex justify-start   rounded-lg bg-opacity-30 flex-col h-[51px] w-full ">
                        <p className="text-[12px] text-shark-100 ms-2">Mi Migrated Amount</p>
                        <div className="flex gap-2 ms-2">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </div>
          <div className=" flex  items-center justify-between text-[12px]">
            <div className='flex gap-2 items-center'>
              <div className="flex gap-2 bg-shark-300 rounded-lg bg-opacity-30 w-[168px] h-[42px] text-white items-center justify-center">
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
