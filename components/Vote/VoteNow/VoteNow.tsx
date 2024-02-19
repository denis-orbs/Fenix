import StepBox from '@/components/Common/Boxes/StepBox'
import Image from 'next/image'
import useStore from '@/store'
import ReadMoreModal from '@/components/Modals/Liquidity/ReadMore'

const VoteNow = () => {
  const { setReadMoreModal } = useStore()

  const handleReadMore = () => setReadMoreModal(true)
  return (
    <StepBox>
      <div className="flex flex-col justify-center w-full px-5 py-5 bg-shark-400 bg-opacity-40 xl:px-10 xl:py-0 rounded-2xl xl:rounded-none">
        <div className="flex items-center mb-3 justify-evenly">
          <h4 className="w-full mb-3 text-sm text-white">Vote now</h4>
          <span className="text-2xl icon-reflesh text-shark-100"></span>
        </div>
        <div className="relative flex flex-col w-auto">
          <div className="flex items-center justify-center gap-8 p-5 text-white border-solid border-1 border-shark-400 bg-shark-400 bg-opacity-40 rounded-xl">
            <div>
              <Image
                alt="logo-fenix"
                src={'/static/images/vote/fenix-logo.svg'}
                className="h-[61px] w-[61px]"
                width={61}
                height={61}
              />
            </div>
            <div>
              <p>
                Select your <span className="font-bold">FNX</span>
              </p>
            </div>
            <div className="flex gap-3 p-3 border border-solid rounded-lg border-shark-400">
              <span className="icon-wallet"></span>
              <p>Positions Locked: 0</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-1 mt-5">
          <div className="box text-sm flex flex-col items-center w-[30%]">
            <p className="text-shark-100">
              <span className="font-bold">FNX</span> Balance
            </p>
            <p className="text-white">---------</p>
          </div>
          <div className="box text-sm flex flex-col  items-start w-[30%]">
            <p className="text-shark-100">Emissions / % of Vote</p>
            <p className="text-2xl text-white">$0.00</p>
          </div>
          <div className="w-[40%] flex flex-col gap-3">
            <div className="flex text-xs text-white box justify-evenly">
              <p className="text-shark-100">Vating Apr</p> <p>0%</p>
            </div>
            <div className="flex text-xs text-white box justify-evenly">
              <p className="text-shark-100">Epoch 39</p> <p className="text-gray-500">-19748d -19 -32m</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center gap-4 mt-10'>
        <p
          className="flex items-center gap-2 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500"
          onClick={handleReadMore}
        >
          <span className="text-lg icon-link"></span>
          Read More
        </p>
        <p className='flex items-center gap-2 text-shark-100'><span className='icon-discord'></span>Need some help?</p>
        </div>
      </div>
      <ReadMoreModal />
    </StepBox>
  )
}

export default VoteNow
