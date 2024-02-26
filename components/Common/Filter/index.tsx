'use client'

import { Button } from '@/components/UI'
import cn from '@/utils/cn'

interface FilterProps {
  options: string[]
  currentTab: string
  bgBox?: string
  align?: 'center' | 'start' | 'end'
  setCurrentTab: (parameter: string) => void
}

const Filter = ({ options, currentTab, setCurrentTab, bgBox = '', align = "start" }: FilterProps) => {
  const handlerChange = (parameter: string) => {
    setCurrentTab(parameter)
  }

  const mergeClassName = cn(
    'flex flex-wrap items-center w-full gap-2 px-3 py-2 rounded-lg xl:flex-row 2xl:gap-3 xl:w-full bg-opacity-40',
    align === 'center' ? 'justify-center' : align === 'start' ? 'justify-start' : 'justify-end',
    bgBox === '' ? 'filter-box' : bgBox
  )

  return (
    <>
      <div className={mergeClassName}>
        {options.map((option, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                handlerChange(option.toUpperCase())
              }}
              variant={currentTab === option.toString().toUpperCase() ? 'primary' : 'tertiary'}
              className="h-[40px] md:h-auto w-full md:w-auto"
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
