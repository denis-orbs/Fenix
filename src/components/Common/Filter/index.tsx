'use client'

import { Button } from '@/src/components/UI'
import useIsMobile from '@/src/library/hooks/useIsMobile'

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
      <div className="max-h-[45px] flex items-center w-full gap-2 px-2 py-2 
     
      rounded-xl xl:flex-row 2xl:gap-3 xl:w-full bg-opacity-40 bg-shark-400">
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
              className=" w-full h-[32px] md:w-auto
              !text-xs !lg:text-xl
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
