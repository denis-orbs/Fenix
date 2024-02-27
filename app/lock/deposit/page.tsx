import Decorator from '@/components/Common/Layout/Background'
import DepositLock from '@/components/Lock/Common/Deposit'

const DepositPage = () => {
  return (
    <main className="container flex justify-center py-10 px-10">
      <DepositLock />
      <Decorator />
    </main>
  )
}

export default DepositPage
