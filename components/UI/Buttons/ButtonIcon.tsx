"use client"

import React from "react"

interface ButtonIconProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const ButtonIcon = ({
  children,
  onClick,
}: ButtonIconProps) => {
  return <button onClick={onClick} className="button-icon">{children}</button>
}


