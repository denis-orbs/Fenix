'use client'

import { Button } from '@/components/UI'

interface FilterProps {
  Options: string[]
  currentTab: string
  setCurrentTab: (parameter: string) => void
}

const Filter = ({ Options, currentTab, setCurrentTab }: FilterProps) => {
  // console.log(currentTab)

  const handlerChange = (parameter: string) => {
    setCurrentTab(parameter)
  }
  return (
    <div
      className="flex flex-col xl:flex-row items-center gap-2 px-3 py-2 filter-box 
    rounded-lg justify-start md:gap-5 w-full xl:w-2/3  bg-opacity-40"
    >
      {Options.map((option, index) => {
        return (
          <Button
            key={index}
            onClick={()=>{
              handlerChange(option.toUpperCase())
            }}
            variant={currentTab === option.toString().toUpperCase() ? 'primary' : 'default'}
            className="h-[40px] md:h-auto w-full xl-w-auto"
          >
            {option}
          </Button>
        )
      })}
    </div>
  )
}

export default Filter
