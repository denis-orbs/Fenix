'use client'

interface Item {
  title?: string
  description?: string
  icon?: string
}

interface ItemProps {
  item: Item
}

const Item = ({ item }: ItemProps) => {
  return (
    <div className="point-box bg-shark-400 bg-opacity-40 p-10 rounded-lg flex flex-col justify-center items-center relative w-1/2 h-[200px]">
      <h4 className="text-sm text-white text-center mb-4">{item.title}</h4>
      <p className="text-sm text-shark-100 text-center">
        {item.description}
      </p>
    </div>
  )
}

export default Item
