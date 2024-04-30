import { useEffect, useState } from "react"

const Input = ({ title, percent, value, onChange, onTitleClick }: { title: string, percent: string, value: string, onChange?: any, onTitleClick?:any }) => {

  const [styleObj, setStyleObj] = useState({})

  useEffect(() => {
    if(onTitleClick) setStyleObj({cursor: "pointer"})
    else setStyleObj({})
  }, [onTitleClick])

  return (
    <div className="text-white flex-grow">
      <div className="mb-2 text-xs leading-normal" onClick={onTitleClick ? onTitleClick : () =>{}} style={styleObj}>{title}</div>
      <div className="relative w-full text-sm leading-normal">
        <input
          type="text"
          placeholder="0"
          className="bg-shark-300 bg-opacity-40 border border-shark-200 h-[55px] w-full rounded-lg outline-none px-3 text-sm"
          value={value}
          onChange={onChange}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 ">{percent}%</div>
      </div>
    </div>
  )
}

export default Input
