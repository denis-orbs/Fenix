'use client'
import { Button } from '@/components/UI'

const InactiveDashboard = () => {
  return (
    <div className="flex flex-col items-center">
      {/* /// */}
      <div className="flex flex-col  gap-3 w-full lg:w-4/5">
        <div className="text-white flex justify-between items-center flex-wrap">
          <p className="flex gap-3 text-lg ms-2">
          Liquidity Positions <span className="icon-info"></span>
          </p>
          <Button variant="tertiary" className='flex gap-2  !py-2'> <span className='icon-logout '></span>New Deposit</Button>
        </div>
        <div className="box-dashboard p-6">
          <p className="text-white text-sm">
            To receive emissions <span className="text-green-400 underline">deposit and stake</span> your liquidity
            first.
          </p>
        </div>
      </div>
      {/* /// */}
      <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10">
        <div className="text-white flex justify-between items-center">
          <p className="flex gap-3 text-lg ms-2">
            Locks <span className="icon-info"></span>
          </p>
        </div>
        <div className="box-dashboard p-6">
          <p className="text-white text-sm">To receive incentives and fees create a lock and vote with it.</p>
        </div>
      </div>
      {/* /// */}
      <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10">
        <div className="text-white flex justify-between items-center flex-wrap ">
          <p className="flex gap-3 text-lg ms-2">
            Nest <span className="icon-info"></span>
          </p>
          <Button variant="tertiary" className='flex gap-2 !py-2'><span className='icon-logout'></span>My strategies</Button>
        </div>
        <div className="box-dashboard p-6">
          <p className="text-white text-sm">No Nest found.</p>
        </div>
      </div>
      {/* /// */}
      <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10">
        <div className="text-white flex justify-between items-center">
          <p className="flex gap-3 text-lg ms-2">
            Liquidity Rewards <span className="icon-info"></span>
          </p>
        </div>
        <div className="box-dashboard p-6">
          <p className="text-white text-sm">
            Start by <span className="text-green-400 underline">depositing and staking</span>your liquidity first.
          </p>
        </div>
      </div>
      {/* /// */}
      <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10">
        <div className="text-white flex justify-between items-center">
          <p className="flex gap-3 text-lg ms-2">
          Voting Rewards <span className="icon-info"></span>
          </p>
        </div>
        <div className="box-dashboard p-6 flex gap-8 items-center ">
          <p className="text-white text-sm">
          No rewards found. 
          </p>
          <div className='flex text-white'>
          <span className='icon-reflesh'></span>
          <Button variant='default' className='!py-0  flex gap-2'> All Relays</Button>
            
             </div>
        </div>
      </div>
      {/* /// */}
    </div>
  )
}

export default InactiveDashboard
