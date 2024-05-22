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
    <div className="relative">
      <h4 className="w-full mb-3 text-sm xl:absolute font-medium top-1 right-0 z-50 xl:left-[51px] 2xl:left-[70px] text-white  hidden xl:flex">
        Vote now
      </h4>
      <StepBox className="xl:max-h-[336px] xl:min-h-[336px]">
        <h4 className="w-full mb-3 text-sm  font-medium flex xl:hidden  text-white ">
          Vote now
        </h4>

        <div className="flex flex-col justify-center xl:min-h-[px] w-full  relative z-10 xl:py-6 2xl:py-10">
          <div className="relative  flex flex-col w-full">
            <ActiveVote handlerChange={handlerChange} />
          </div>
          <div className="flex flex-wrap xl:flex-nowrap gap-3 mt-2 items-center w-full">
            <div className="box-vote-medium">
              <div className="relative z-50 flex items-center flex-col justify-center p-4">
                <p className="text-shark-100 text-xs text-center">Fenix Balance</p>
                <p className="text-white text-xl">0.00</p>
              </div>
            </div>
            <div className="box-vote-medium">
              <div className="relative z-50 flex items-center flex-col justify-center p-4">
                <p className="text-shark-100 text-xs text-center">Emissions / % of Vote</p>
                <p className="text-xl text-white">0%</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full ">
              <div className="box-vote-short">
                <div className="flex flex-col xl:flex-row text-xs text-white p-2 justify-center items-center xl:gap-3 ">
                  <p className="text-shark-100 line-clamp-1">Vating Apr</p> <p className="line-clamp-1">0%</p>
                </div>
              </div>
              <div className="box-vote-short">
                <div className="flex flex-col xl:flex-row text-xs text-white p-2 justify-center items-center xl:gap-3 ">
                  <p className="text-shark-100 line-clamp-1">Epoch 1</p>{' '}
                  <p className="text-white xl:text-[10px]  line-clamp-1">6d 12h 43m</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 py-5">
          <p
            className="flex items-center gap-2 text-xs cursor-pointer text-shark-100 hover:text-outrageous-orange-500"
            onClick={handleReadMore}
          >
            <span className=" icon-link"></span>
            Read More
          </p>
          <Link target="_blank" href="https://discord.com/invite/fenixfi" className="flex items-center text-xs gap-2 text-shark-100 cursor-pointer ">
            <span className="icon-discord"></span>Need some help?
          </Link>
        </div>
        </div>
        <ReadMoreModal />
      </StepBox>
    </div>
  )
}

export default VoteNow
