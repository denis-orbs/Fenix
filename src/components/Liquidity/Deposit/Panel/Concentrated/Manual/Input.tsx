import { useEffect, useState } from 'react'

const Input = ({
  title,
  percent,
  value,
  onChange,
  onTitleClick,
  setCurrentPercentage,
}: {
  title: string
  percent: string
  value: string
  onChange?: any
  onTitleClick?: any
  setCurrentPercentage: any
}) => {

  const [styleObj, setStyleObj] = useState({})
  const [shownPercent, setShownPercent] = useState(percent)
  const [timeout, setTimeoutID] = useState<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    setShownPercent(percent)
  }, [percent])

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
            min={-100}
            value={shownPercent}
            className={`bg-transparent outline-none  
            ${Number(shownPercent.length) === 3 && 'max-w-[25px]'}
            ${Number(shownPercent) === 0 && Number(shownPercent.length) === 1 && 'max-w-[10px]'}
            ${Number(shownPercent) < 0 && Number(shownPercent.length) === 2 && 'max-w-[18px]'}
            ${Number(shownPercent) > 0 && Number(shownPercent.length) === 1 && 'max-w-[10px]'}
            ${Number(shownPercent) > 0 && Number(shownPercent.length) === 2 && 'max-w-[18px]'}
            ${Number(shownPercent) < 0 ? 'max-w-[1.9rem]' : 'max-w-[1.4rem]'}`}
            onChange={(event) => {
              if (timeout) clearTimeout(timeout)
              setShownPercent(event.target.value)

              const newTimeout = setTimeout(() => {
                const value = (Number(event.target.value))
                setCurrentPercentage(value < -100 ? -100 : value)
              }, 1000)
          
              setTimeoutID(newTimeout)
            }}
          />
          <span>%</span>
        </div>
      </div>
    </div>
  )
}

export default Input
