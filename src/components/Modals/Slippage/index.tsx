'use client'

import { Button, Modal } from '@/src/components/UI'
import { useSetSlippageToleranceCallback, useSlippageTolerance } from '@/src/state/user/hooks'
import useStore from '@/src/state/zustand'
import { useEffect, useState } from 'react'
import { z } from 'zod'
const slippageOptions = [
  { label: 'Auto', value: 'auto' },
  { label: '0.5%', value: 0.5 },
  { label: '1.0%', value: 1 },
  { label: '1.5%', value: 1.5 },
  { label: '5.0%', value: 5 },
]

interface SlippageProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}
const slippageSchema = z.union([z.number().min(0).max(50), z.literal('auto')])
const Slippage = () => {
  // const handlerClose = () => setOpenModal(false)
  const openModal = useStore((state) => state.slippageModal)
  const { setSlippageModal } = useStore()
  const setSlippage = useSetSlippageToleranceCallback()
  const slippage = useSlippageTolerance()
  const [slippageInput, setSlippageInput] = useState<any>(slippage?.toString())
  const [invalidInput, setInvalidInput] = useState<boolean>(false)
  const handleClose = () => setSlippageModal(false)

  // when slippage for redux changes, update the input in the ui
  useEffect(() => {
    setSlippageInput(slippage?.toString())
  }, [slippage])

  // when input changes, validate schema
  useEffect(() => {
    try {
      console.log(slippageInput)
      const parsedInput = slippageInput === 'auto' ? 'auto' : parseFloat(slippageInput)
      console.log(parsedInput)
      slippageSchema.parse(parsedInput)
      setInvalidInput(false)
    } catch (error) {
      setInvalidInput(true)
    }
  }, [slippageInput])
  return (
    <Modal className="mx-auto" openModal={openModal} setOpenModal={setSlippageModal}>
      <div className="common-modal">
        <span className="absolute top-0 right-0 text-2xl cursor-pointer icon-x text-shark-100" onClick={handleClose} />
        <div className="relative w-full h-full">
          <h2 className="mt-5 text-xl font-bold text-center text-white sm:mt-10 lg:mt-10">Slippage Tolerance</h2>
          <p className="text-shark-100 text-base mt-3 text-center lg:mb-6 sm:mb-6 mb-2 max-w-[300px] mx-auto">
            Adjust to your personal preferences.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="0"
              value={slippageInput}
              onChange={(e) => {
                setSlippageInput(e.target.value)
              }}
              className="p-4 w-full h-[55px] rounded-lg outline-none bg-shark-400 text-white"
            />
            <button
              onClick={() => {
                setSlippageInput('auto')
              }}
              className="absolute w-6 h-6 text-xs text-white rounded-lg cursor-pointer hover:bg-button-primary hover:border-outrageous-orange-400 right-2 top-4 bg-shark-300 bg-none"
            >
              %
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-3 p-3 lg:flex-nowrap">
            {slippageOptions.map((option) => (
              <Button
                key={option.label}
                className="!py-2"
                variant="tertiary"
                onClick={() => setSlippageInput(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <p className="text-sm text-center text-shark-200">
            Setting a high slippage tolerance can help transactions filled succesfully, but you may not get such a good
            price. Use with caution.
          </p>
          <div className="flex justify-center">
            <Button
              className="mt-2 mb-2 lg:w-full sm:w-full w-72"
              variant="tertiary"
              disabled={invalidInput}
              onClick={() => {
                setSlippage(slippageInput)
                handleClose()
              }}
            >
              {invalidInput ? 'Invalid Slippage' : 'Confirm Slippage'}
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
            <span className="icon-discord"></span>
            <p className="text-sm">Need help?</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Slippage
