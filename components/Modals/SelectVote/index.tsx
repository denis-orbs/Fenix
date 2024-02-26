'use client'

import { Modal } from '@/components/UI'
import Image from 'next/image'

interface SelectVoteProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  activeVote: boolean
  setActiveVote: (parameter: boolean) => void
}

const SelectVote = ({ setOpenModal, openModal, setActiveVote, activeVote }: SelectVoteProps) => {
  const handlerClose = () => setOpenModal(false)
  const handlerChange = () => (activeVote ? setActiveVote(false) : setActiveVote(true), setOpenModal(false))

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className="common-modal">
        <span className="absolute top-0 right-0 text-2xl cursor-pointer icon-x text-shark-100" onClick={handlerClose} />
        <div className="relative z-10 w-full h-full">
          <h1 className="mb-2 text-lg font-medium text-white">Select veFNX to Vote</h1>
          <div className="mb-4">
            <div className="relative bg-shark-400 bg-opacity-40 w-full rounded-xl pl-4 xl:pl-5 pr-4 xl:pr-3 py-3 flex items-center h-[62px]">
              <span className="flex items-center justify-center w-8 h-5 text-2xl icon-search text-shark-100" />
              <input
                type="text"
                placeholder="Search by ID..."
                className="w-full px-2 text-sm bg-transparent outline-none text-shark-100"
              />
            </div>
          </div>
          <div>
            <div className="flex text-sm text-shark-100">
              <p className="w-[45%]">Lock ID</p>
              <div className="flex gap-2">
                <p>Position</p>
                <p>Voting Power</p>
                <p>Rewards</p>
              </div>
            </div>

            <div className="max-h-[220px] overflow-y-auto">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <div key={index} className="flex flex-col gap-3 cursor-pointer">
                    <div
                      onClick={handlerChange}
                      className="flex flex-wrap items-center justify-between p-4 mt-2 text-xs rounded-lg xl:flex-nowrap bg-shark-400 bg-opacity-40"
                    >
                      <div className="flex items-center gap-2">
                        <Image alt="fenix-logo" src={'/static/images/vote/fenix-logo.svg'} height={32} width={32} />
                        <div className="flex flex-col">
                          <div className="flex gap-2">
                            {' '}
                            <p className="text-white">9339</p> <p className="text-green-500">•Active</p>
                          </div>
                          <div className="flex">
                            <p className="text-shark-100">Expires 14/09/2024</p>
                          </div>
                        </div>
                      </div>
                      {/* first */}
                      <div>
                        <p className="text-white">981 FNX</p>
                      </div>
                      {/* second */}
                      <div>
                        <p className="text-white">981 FNX</p>
                      </div>
                      {/* third */}
                      <div>
                        <p className="text-green-400">$12.98 !</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SelectVote
