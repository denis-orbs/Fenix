/* eslint-disable no-unused-vars */
'use client'

import React, { useEffect } from 'react'

interface ModalProps {
  children: React.ReactNode
  openModal: boolean
  className?: string
  setOpenModal: (openModal: boolean) => void
}

const Modal = ({ children, openModal, className = '', setOpenModal }: ModalProps) => {
  useEffect(() => {
    openModal && (document.body.style.overflow = 'hidden')
    !openModal && (document.body.style.overflow = 'unset')
  }, [openModal])

  if (!openModal) return null

  const handleCloseModal = () => setOpenModal(false)

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}
      onClick={handleCloseModal}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-[90%]">{children}</div>
    </div>
  )
}

export default Modal
