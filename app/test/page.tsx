/* eslint-disable import/no-default-export */
import { TableHead, TableBody, TableCell, TableRow } from '@/components/UI'

export default function Home() {

  return (
    <main>
      <div className="p-5">
        <TableHead
          items={[
            { text: 'Liquidity Pool', className: 'text-left', sortable: true },
            { text: 'APR', className: '', sortable: true },
            { text: 'TVL', className: '', sortable: true },
            { text: 'Volume', className: 'max-w-[200px]', sortable: true },
            { text: 'Fees', className: 'max-w-[200px]', sortable: true },
            { text: 'Pool Balance', className: 'max-w-[200px]', sortable: true },
          ]}
        />

        <TableBody>
          <TableRow>
            <TableCell>aaasd</TableCell>
            <TableCell>
              <span className="text-white">34.58%</span>
            </TableCell>
            <TableCell className="">aaasd</TableCell>
            <TableCell className="max-w-[200px]">aaasd</TableCell>
            <TableCell className="max-w-[200px]">aaasd</TableCell>
            <TableCell className="max-w-[200px]">aaasd</TableCell>
          </TableRow>
        </TableBody>
      </div>
    </main>
  )
}
