'use client'

import { Button, Modal } from '@/components/UI'
import Image from 'next/image'

interface ConfirmMergeProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}

const ConfirmMerge = ({ setOpenModal, openModal }: ConfirmMergeProps) => {
  const handlerClose = () => setOpenModal(false)

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className="common-modal">
        <span className="absolute top-0 right-0 text-2xl cursor-pointer icon-x text-shark-100" onClick={handlerClose} />
        <div className="relative z-10 w-full h-full">
          <div className="absolute top-[-8px] left-0">
            <Button variant="secondary">
              <Image src={'/static/images/modals/info.svg'} alt="Information" width={20} height={20} />
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center px-[10%] py-[10%]">
            <Image
              src={'/static/images/modals/modal-confirm-merge.png'}
              alt="Modal Confirm Merge Modal"
              width={190}
              height={105}
            />
            <h1 className="my-4 text-xl font-semibold text-white">Confirm Merge</h1>
            <p className="text-center text-shark-100">
              All your non-claimed rewards (including next epoch ones) associated with the selected veFNX’s will be
              lost. Please double check that you have claimed all your rewards before merging.
            </p>
            <Button variant="primary" className="mt-4">
              Proceed with Merge
            </Button>
            <Button variant="default" className="mt-2">
              <Image src={'/static/images/modals/discord.svg'} alt="Discord Icon" width={93} height={20} />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmMerge
