import StepBox from '@/components/Common/Boxes/StepBox'
import Image from 'next/image'
import useStore from '@/store'
import ReadMoreModal from '@/components/Modals/Liquidity/ReadMore'
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
      <div className="flex flex-col justify-center w-full rounded-2xl xl:rounded-none relative z-10">
        <div className="flex items-center mb-3 justify-evenly">
          <h4 className="w-full mb-3 text-sm text-white">Vote now</h4>
          {/* <span className="text-2xl icon-reflesh text-shark-100"></span> */}
        </div>
        <div className="relative flex flex-col w-auto">
          {activeVote ? (
            <ActiveVote handlerChange={handlerChange}/>
          ) : (
           <InactiveVote handlerChange={handlerChange}/>
          )}
        </div>
        <div className="flex gap-3 p-1 mt-5">
          <div className="mini-box-vote text-sm flex flex-col items-center justify-center w-[30%]">
            <p className="text-shark-100">Fenix Balance</p>
            <p className="text-white text-2xl">0.00</p>
          </div>
          <div className="mini-box-vote text-sm flex flex-col  items-center w-[30%]">
            <p className="text-shark-100">Emissions / % of Vote</p>
            <p className="text-2xl text-white">0%</p>
          </div>
          <div className="w-[40%] flex flex-col gap-3">
            <div className="flex text-xs text-white mini-box-vote justify-evenly">
              <p className="text-shark-100">Vating Apr</p> <p>0%</p>
            </div>
            <div className="flex text-xs text-white mini-box-vote justify-evenly">
              <p className="text-shark-100">Epoch 1</p> <p className="text-white">6d 12h 43m</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <p
            className="flex items-center gap-2 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500"
            onClick={handleReadMore}
          >
            <span className="text-lg icon-link"></span>
            Read More
          </p>
          <p className="flex items-center gap-2 text-shark-100">
            <span className="icon-discord"></span>Need some help?
          </p>
        </div>
      </div>
      <ReadMoreModal />
    </StepBox>
  )
}

export default VoteNow
