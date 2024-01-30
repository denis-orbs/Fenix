/* eslint-disable import/no-default-export */
import TableHead from '@/components/UI/Table/TableHead'
import TableBody from '@/components/UI/Table/TableBody'
import TableTr from '@/components/UI/Table/TableTr'
import TableTd from '@/components/UI/Table/TableTd'

export default function Home() {
  return (
    <main>
      <div className="p-5">
        <TableHead
          items={[
            { text: 'Liquidity Pool' },
            { text: 'APR', className: 'text-right', sortable: true },
            { text: 'TVL', className: 'text-right', sortable: true },
            { text: 'Volume', className: 'text-right max-w-[200px]', sortable: true },
            { text: 'Fees', className: 'text-right max-w-[200px]', sortable: true },
            { text: 'Pool Balance', className: 'text-right max-w-[200px]', sortable: true },
          ]}
        />

        <TableBody>
          <TableTr>
            <TableTd>
              aaasd
            </TableTd>
            <TableTd>
              aaasd
            </TableTd>
            <TableTd>
              aaasd
            </TableTd>
            <TableTd className='max-w-[200px]'>
              aaasd
            </TableTd>
            <TableTd className='max-w-[200px]'>
              aaasd
            </TableTd>
            <TableTd className='max-w-[200px]'>
              aaasd
            </TableTd>
          </TableTr>
        </TableBody>
      </div>
    </main>
  )
}
