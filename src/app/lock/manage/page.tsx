import Decorator from '@/src/components/Common/Layout/Background'
import LockManage from '@/src/components/Lock/Common/LockManage'

const ManagePage = () => {
  return (
    <main className="container flex justify-center pb-20 ">
      <LockManage />
      <Decorator />
    </main>
  )
}

export default ManagePage
