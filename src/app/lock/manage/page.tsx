import Decorator from '@/src/components/Common/Layout/Background'
import LockManage from '@/src/components/Lock/Common/LockManage'

const ManagePage = () => {
  return (
    <main className="container flex justify-center py-10 px-10 ">
      <LockManage />
      <Decorator />
    </main>
  )
}

export default ManagePage
