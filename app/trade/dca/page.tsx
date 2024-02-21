'use client'
import DCA from '@/components/Trade/DCA'
import TradeLayout from '@/components/Trade/Common/Layout'
import ConfirmMerge from '@/components/Modals/ConfirmMerge'
import { useState } from 'react'
const TradePage = () => {
  const [openModal, setOpenModal] = useState(true)
  return (
    <TradeLayout>
      <DCA />
      <ConfirmMerge
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </TradeLayout>
  )
}

export default TradePage
