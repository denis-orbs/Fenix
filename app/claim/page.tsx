/* eslint-disable import/no-default-export */
import Claim from '@/components/Claim'
import Pagination from '@/components/UI/Pagination'

export default function ClaimPage() {
  return (
    <main>
      <div className="py-5 max-w-[1820px] mx-auto ">
        <Claim />

        <Pagination className='mx-auto' numberPages={9} />
      </div>
    </main>
  )
}
