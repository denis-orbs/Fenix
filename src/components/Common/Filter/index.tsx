/* eslint-disable max-len */
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
      <div className="max-h-[45px] max-2xl:max-h-[60px] overflow-hidden overflow-x-auto flex items-center scroll w-full gap-2 px-2 py-2 rounded-xl xl:flex-row 2xl:gap-3 xl:w-full bg-opacity-40 bg-shark-400">
        {options.map((option, index) => {
          return (
            <div className='' key={index}>
              <Button
                onClick={() => {
                  handlerChange(option.toUpperCase())
                }}
                variant={
                  currentTab.toUpperCase() === option.split('').join('').toString().toUpperCase()
                    ? 'primary'
                    : `${isMobile ? 'tertiary' : 'default'}`
                }
                className="h-[32px] !text-xs !lg:text-xl whitespace-nowrap"
              >
                {option}
              </Button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Filter
