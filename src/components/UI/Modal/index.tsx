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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenModal(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!openModal) return null

  const handleCloseModal = () => setOpenModal(false)

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-black bg-opacity-75 backdrop-blur-sm flex 
      items-center justify-center mx-auto z-[100] ${className}`}
      onClick={handleCloseModal}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default Modal
