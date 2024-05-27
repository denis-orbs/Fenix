import { useEffect, useState } from 'react'

const Input = ({
  title,
  percent,
  value,
  onChange,
  onTitleClick,
  setCurrentPercentage,
  isPositive,
}: {
  title: string
  percent: string
  value: string
  onChange?: any
  onTitleClick?: any
  setCurrentPercentage: any
  isPositive: any
}) => {

  const [styleObj, setStyleObj] = useState({})


  useEffect(() => {
    if (onTitleClick) setStyleObj({ cursor: 'pointer' })
    else setStyleObj({})
  }, [onTitleClick])

  return (
    <div className="text-white flex-grow">
      <div className="mb-2 text-xs leading-normal" onClick={onTitleClick ? onTitleClick : () => {}} style={styleObj}>
        {title}
      </div>
      <div className="relative w-full text-sm leading-normal">
        <input
          type="text"
          placeholder="0"
          className="bg-shark-300 bg-opacity-40 border border-shark-200 h-[55px] w-full rounded-lg outline-none px-3 text-sm"
          value={value}
          onChange={onChange}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <input
            type="number"
            max={100}
            min={-100}
            value={percent}
            className={`bg-transparent outline-none  
            ${Number(percent) < 0 && Number(percent.length) === 3 && 'max-w-[25px]'}
            ${Number(percent) === 0 && Number(percent.length) === 1 && 'max-w-[10px]'}
            ${Number(percent) < 0 && Number(percent.length) === 2 && 'max-w-[18px]'}
            ${Number(percent) > 0 && Number(percent.length) === 1 && 'max-w-[10px]'}
            ${Number(percent) > 0 && Number(percent.length) === 2 && 'max-w-[18px]'}
            ${Number(percent) < 0 ? 'max-w-[1.9rem]' : 'max-w-[1.4rem]'}`}
            onChange={(event) => {
              const value = Math.abs(Number(event.target.value))
              setCurrentPercentage(value > 100 ? 100 : value)
            }}
          />
          <span>%</span>
        </div>
      </div>
    </div>
  )
}

export default Input
