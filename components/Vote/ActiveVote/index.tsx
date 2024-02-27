import Image from 'next/image'

interface ActiveVoteProps {
  handlerChange?: () => void
}

const ActiveVote = ({ handlerChange }: ActiveVoteProps) => {
  return (
    <div
      className={`flex flex-wrap  xl:flex-nowrap items-center gap-8 p-5 text-white border-solid border-1
       border-shark-400 bg-shark-400 bg-opacity-40 rounded-xl`}
    >
      <div className="flex justify-between w-full items-center cursor-pointer"  onClick={handlerChange}>
        <div className="flex items-center gap-2  ">
          <Image
            alt="logo-fenix"
            src={'/static/images/vote/fenix-logo.svg'}
            className="h-[32px] w-[32px]"
            width={61}
            height={61}
          />
          <div className="flex flex-col">
            <div className="flex gap-2 items-center ">
              <p className="text-shark-100 text-xs">Selected Position</p>
            </div>
            <div className="flex text-xs gap-2 ">
              <p>9339</p>
              <p className="text-green-500">•Active</p>
            </div>
          </div>
        </div>
        <span className="icon-chevron"></span>
      </div>
      <div className="flex xl:justify-end xl:gap-4 w-full justify-center gap-5 items-center">
        <div className="text-xs text-center  xl:w-auto">
          <p className="text-shark-100">Position</p>
          <p>981 FNX</p>
        </div>
        <div className="text-xs text-center xl:w-auto">
          <p className="text-shark-100">Voting Power</p>
          <p>981 veFNX</p>
        </div>
        <div className="text-xs text-center xl:w-auto">
          <p className="text-shark-100">Rewards</p>
          <p className="text-green-300">$12.98!</p>
        </div>
      </div>
    </div>
  )
}

export default ActiveVote
