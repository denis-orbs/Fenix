'use client'

import { Button } from '@/components/UI'
import useIsMobile from '@/hooks/useIsMobile'

interface FilterProps {
  options: string[]
  currentTab: string
  bgBox?: string
  setCurrentTab: (parameter: string) => void
}

const Filter = ({ options, currentTab, setCurrentTab }: FilterProps) => {
  const isMobile = useIsMobile()
  const handlerChange = (parameter: string) => {
    setCurrentTab(parameter)
  }

  return (
    <>
      <div className="flex flex-wrap items-center w-full gap-2 px-2 py-2 rounded-xl xl:flex-row 2xl:gap-3 xl:w-full bg-opacity-40 bg-shark-400">
        {options.map((option, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                handlerChange(option.toUpperCase())
              }}
              variant={
                currentTab.toUpperCase() === option.split('').join('').toString().toUpperCase()
                  ? 'primary'
                  : `${isMobile ? 'tertiary' : 'default'}`
              }
              className="h-[40px] md:h-auto w-full md:w-auto
              "
            >
              {option}
            </Button>
          )
        })}
      </div>
    </>
  )
}

export default Filter
