'use client'

import { Button } from '@/components/UI'

interface FilterProps {
  options: string[]
  currentTab: string
  bgBox?: string 
  justifyCenter?: string
  setCurrentTab: (parameter: string) => void
}

const Filter = ({ options, currentTab, setCurrentTab, bgBox = "", justifyCenter = "" }: FilterProps) => {

  const handlerChange = (parameter: string) => {
    setCurrentTab(parameter)
  }
  return (
    <div
      className={`flex  flex-wrap items-center justify-center xl:${justifyCenter === "" ? "justify-start": justifyCenter } w-full gap-2 px-3 
      py-2 rounded-lg xl:flex-row ${bgBox === "" ? "filter-box" : bgBox} md:gap-5 xl:w-full bg-opacity-40`}
    >
      {options.map((option, index) => {
        return (
          <Button
            key={index}
            onClick={()=>{
              handlerChange(option.toUpperCase())
            }}
            variant={currentTab === option.toString().toUpperCase() ? 'primary' : 'default'}
            className="h-[40px]  md:h-auto w-2/5  xl:w-auto"
          >
            {option}
          </Button>
        )
      })}
    </div>
  )
}

export default Filter
