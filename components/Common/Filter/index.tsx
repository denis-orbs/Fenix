'use client'

import { Button } from '@/components/UI'

interface FilterProps {
  Options: string[]
  tableChange?: string
  setTableChange: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ Options, tableChange, setTableChange }: FilterProps) => {
  const handlerChange = (option: string) => {
    setTableChange(option.split(' ').join("").toLowerCase())
  }
  return (
    <div
      className="flex flex-col xl:flex-row items-center gap-2 px-3 py-2 filter-box 
    rounded-lg justify-start md:gap-5 w-full xl:w-2/3  bg-opacity-40"
    >
      {Options.map((option, index) => {
        //we need a logic to  change the current active button
        return (
          <Button
            key={index}
            variant={tableChange == option.split(" ").join("").toLowerCase() ? "primary" : "secondary"}
            onClick={()=>{
              handlerChange(option)
            }}
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
