'use client'

import { Button } from '@/components/UI'

interface FilterProps {
  options: string[]
  currentTab: string
  setCurrentTab: (parameter: string) => void
}

const Filter = ({ options, currentTab, setCurrentTab }: FilterProps) => {

  const handlerChange = (parameter: string) => {
    setCurrentTab(parameter)
  }
  return (
    <div
      className="flex flex-col items-center justify-start w-full gap-2 px-3 
      py-2 rounded-lg xl:flex-row filter-box md:gap-5 xl:w-full bg-opacity-40"
    >
      {options.map((option, index) => {
        return (
          <Button
            key={index}
            onClick={()=>{
              handlerChange(option.toUpperCase())
            }}
            variant={currentTab === option.toString().toUpperCase() ? 'primary' : 'default'}
            className="h-[40px] md:h-auto w-full xl:w-auto"
          >
            {option}
          </Button>
        )
      })}
    </div>
  )
}

export default Filter
