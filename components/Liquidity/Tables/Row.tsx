/* eslint-disable max-len */

'use client'
import Image from 'next/image'
import { TableCell, TableRow, Button } from '@/components/UI'
import MobileRow from './MobileRow'

type IRow = {
  type: string
  APR: string
}
interface RowDataProps {
  row: IRow
}

const RowData = ({ row }: RowDataProps) => {
  return (
    <>
      <TableRow className="max-xl:hidden">
        <TableCell className="w-[30%]">
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
                {'VOLATILE' === row.type && (
                  <Button variant="tertiary" className="!py-1">
                    Volatile Pool{' '}
                  </Button>
                )}

                {'CONCENTRATED' === row.type ? (
                  <Button
                    variant="tertiary"
                    className="!py-1 hover:!border-none !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 "
                  >
                    Concentrated
                  </Button>
                ) : 'STABLE' === row.type ? (
                  <Button variant="tertiary" className="!py-1">
                    Stable Pool
                  </Button>
                ) : null}

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

        <TableCell className="w-[10%]">
          <div className="flex items-center ">
            <p className="p-2 text-sm text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              {row.APR}%
            </p>
          </div>
        </TableCell>

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

        <TableCell className="flex justify-end w-[15%]">
          <div className="flex gap-2">
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
      </TableRow>
      <MobileRow row={row} />
    </>
  )
}

export default RowData
