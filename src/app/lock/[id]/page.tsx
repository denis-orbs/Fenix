import Decorator from '@/src/components/Common/Layout/Background'
import LockManage from '@/src/components/Lock/Common/LockManage'
import { FC } from 'react'
interface pageProps {
  params: { id: Number }
}
const ManagePage: FC<pageProps> = ({ params }) => {
  return (
    <main className="container flex justify-center pb-20 ">
      <LockManage id={params.id} />
      <Decorator />
    </main>
  )
}

export default ManagePage
