import Link from 'next/link'
import StepBox from '@/src/components/Common/Boxes/StepBox'
import useStore from '@/src/state/zustand'
import ReadMoreModal from '@/src/components/Modals/Liquidity/ReadMore'
import ActiveVote from '@/src/components/Vote/ActiveVote'
import InactiveVote from '@/src/components/Vote/InactiveVote'

interface RewardNowProps {
  openModal: boolean
  activeVote: boolean
  setOpenModal: (parameter: boolean) => void
}
const RewardNow = ({ openModal, setOpenModal, activeVote }: RewardNowProps) => {
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
          <div className="bg-shark-400 bg-opacity-40 text-sm rounded-lg py-5 flex flex-col items-center justify-center w-full xl:w-1/2">
            <p className="text-shark-100">Fenix Balance</p>
            <p className="text-white text-2xl">0</p>
          </div>
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-sm py-5 flex flex-col items-center w-full xl:w-1/2">
            <p className="text-shark-100">Rewards</p>
            <p className="text-2xl text-white">$0</p>
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
          <Link target="_blank" href="https://discord.com/invite/fenixfi" className="flex items-center text-sm gap-2 text-shark-100 cursor-pointer ">
            <span className="icon-discord"></span>Need some help?
          </Link>
        </div>
      </div>
      <ReadMoreModal />
    </StepBox>
  )
}

export default RewardNow
