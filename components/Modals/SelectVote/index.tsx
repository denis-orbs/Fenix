/* eslint-disable max-len */
'use client'

import { Button, Modal } from '@/components/UI'
import Search from '@/components/Common/Search'
import Image from 'next/image'

import { IToken } from '@/types'

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
      <div className="box-select-token">
        <span
          className="absolute top-2 xl:top-0 right-3 xl:right-0 text-2xl cursor-pointer icon-x text-shark-100"
          onClick={handlerClose}
        />
        <div className="relative w-full h-full z-10">
          <h1 className="text-lg font-medium text-white">Select veFNX to Vote</h1>
          <div className="mb-4">
            <div className="search-mini-box">
              <span className="flex items-center justify-center w-8 h-5 text-2xl icon-search  text-shark-100" />
              <input
                type="text"
                placeholder="Search by ID..."
                className="w-full px-2 text-sm bg-transparent outline-none text-shark-100"
              />
            </div>
          </div>
          <div>
            <div className="flex text-shark-100 text-sm">
              <p className="w-[45%]">Lock ID</p>
              <div className="flex gap-2">
                <p>Position</p>
                <p>Voting Power</p>
                <p>Rewards</p>
              </div>
            </div>
            {/* rows */}
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <div key={index} className="flex flex-col gap-3">
                  <div
                    onClick={handlerChange}
                    className="flex xl:flex-nowrap flex-wrap justify-between items-center bg-shark-400 p-4 rounded-lg text-xs bg-opacity-40 mt-2"
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
    </Modal>
  )
}

export default SelectVote
