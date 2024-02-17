import Steps from '../Common/Steps'
import LockTokens from './LockTokens'
import MyLocks from './MyLocks'
import Relay from './Relay'
import { LOCK_STEPS } from './data'

const Lock = () => {
  return (
    <section className='p-5 py-20'>
      <div className="flex items-center gap-6  flex-col xl:flex-row mb-10 xl:h-[450px]">
        <LockTokens />
        <Steps steps={LOCK_STEPS} />
      </div>
      <div className="hidden w-full mb-20 xl:block">
        <MyLocks />
      </div>
      <div className='hidden w-full xl:block'>
        <Relay/>
      </div>
    </section>
  )
}

export default Lock
