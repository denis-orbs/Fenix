import StepBox from '@/components/Common/Boxes/StepBox'
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
        </div>
        <div className="relative flex flex-col w-auto">
          {activeVote ? <ActiveVote handlerChange={handlerChange} /> : <InactiveVote handlerChange={handlerChange} />}
        </div>
        <div className="flex flex-wrap xl:flex-nowrap gap-3 py-3 mt-5 items-center w-full">
          <div className="bg-shark-400 bg-opacity-40 text-sm rounded-lg py-5 flex flex-col items-center justify-center w-full xl:w-[30%]">
            <p className="text-shark-100">Fenix Balance</p>
            <p className="text-white text-2xl">0.00</p>
          </div>
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-sm py-5 flex flex-col items-center w-full xl:w-[30%]">
            <p className="text-shark-100">Emissions / % of Vote</p>
            <p className="text-2xl text-white">0%</p>
          </div>
          <div className="xl:w-[40%] flex flex-col gap-3 w-full">
            <div className="flex text-xs text-white relative bg-shark-400 bg-opacity-40 w-full rounded-lg pl-4 xl:pl-5 pr-4 xl:pr-3 py-3 justify-evenly">
              <p className="text-shark-100">Vating Apr</p> <p>0%</p>
            </div>
            <div className="flex text-xs text-white relative bg-shark-400 bg-opacity-40 w-full rounded-lg pl-4 xl:pl-5 pr-4 xl:pr-3 py-3 justify-evenly">
              <p className="text-shark-100">Epoch 1</p> <p className="text-white">6d 12h 43m</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <p
            className="flex items-center gap-2 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500"
            onClick={handleReadMore}
          >
            <span className=" icon-link"></span>
            Read More
          </p>
          <p className="flex items-center text-sm gap-2 text-shark-100 cursor-pointer ">
            <span className="icon-discord"></span>Need some help?
          </p>
        </div>
      </div>
      <ReadMoreModal />
    </StepBox>
  )
}

export default VoteNow
