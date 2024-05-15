import Link from 'next/link'
import StepBox from '@/src/components/Common/Boxes/StepBox'
import useStore from '@/src/state/zustand'
import ReadMoreModal from '@/src/components/Modals/Liquidity/ReadMore'
import ActiveVote from '../ActiveVote'
import InactiveVote from '../InactiveVote'

interface VoteNowProps {
  openModal: boolean
  activeVote: boolean
  setOpenModal: (parameter: boolean) => void
}

const VoteNow = ({ openModal, setOpenModal, activeVote }: VoteNowProps) => {
  const { setReadMoreModal } = useStore()
  const handlerChange = () => (openModal ? setOpenModal(false) : setOpenModal(true))

  const handleReadMore = () => setReadMoreModal(true)
  return (
    <StepBox>
      <h4 className="w-full mb-3 text-sm xl:absolute font-medium top-1 left-0 xl:ms-10 2xl:ms-16 text-white">Vote now</h4>
      <div className="flex flex-col items-center justify-start w-full  relative z-10 py-3 2xl:py-6">
        <div className="relative  flex flex-col w-full">
          <ActiveVote handlerChange={handlerChange} />
        </div>
        <div className="flex flex-wrap xl:flex-nowrap gap-3 mt-2 items-center w-full">
          <div className="bg-shark-400 bg-opacity-40 text-xs rounded-lg p-2 flex flex-col items-center justify-center w-full xl:w-1/2 min-h-[76px]">
            <p className="text-shark-100 text-xs text-center">Fenix Balance</p>
            <p className="text-white text-xs">0.00</p>
          </div>
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-xs p-2 flex flex-col items-center w-full xl:w-1/2 min-h-[76px] ">
            <p className="text-shark-100 text-xs text-center">Emissions / % of Vote</p>
            <p className="text-xs text-white">0%</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex text-xs text-white relative bg-shark-400 bg-opacity-40 w-full rounded-lg pl-4 xl:pl-5 pr-4 xl:pr-3 py-3 justify-evenly ">
              <p className="text-shark-100">Vating Apr</p> <p>0%</p>
            </div>
            <div className="flex text-xs text-white relative bg-shark-400 bg-opacity-40 w-full rounded-lg pl-4 xl:pl-5 pr-4 xl:pr-3 py-3 justify-evenly">
              <p className="text-shark-100">Epoch 1</p> <p className="text-white xl:text-[10px]">6d 12h 43m</p>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center gap-4 mt-10">
          <p
            className="flex items-center gap-2 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500"
            onClick={handleReadMore}
          >
            <span className=" icon-link"></span>
            Read More
          </p>
          <Link target="_blank" href="https://discord.com/invite/fenixfi" className="flex items-center text-sm gap-2 text-shark-100 cursor-pointer ">
            <span className="icon-discord"></span>Need some help?
          </Link>
        </div> */}
      </div>
      <ReadMoreModal />
    </StepBox>
  )
}

export default VoteNow
