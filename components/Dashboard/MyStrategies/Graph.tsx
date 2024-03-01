'use client'

const Graph = () => {
  return (
    <div className="w-full">
      <div className="flex items-start relative h-20">
        <div className="absolute h-full bottom-0 w-full flex items-end">
          {Array.from({ length: 30 }).map((_, index) => (
            <span key={index} className="h-5 w-5 border-l border-shark-300 block"></span>
          ))}
        </div>
        <p className="bg-shark-300 bg-opacity-40 border border-shark-400 text-white text-xs px-3 py-1 rounded-sm mx-auto mt-1">2,500.13 USDC</p>
        <div className="absolute bottom-0 left-[50%] w-[20%] h-1/2 bg-gradient-to-b from-shark-400 to-green-500 border-x-2 border-green-500 opacity-30"></div>
      </div>
      <div className="flex items-center w-full justify-between px-10 py-3 border-t-2 border-shark-400">
        <p className="text-white text-xs">0.00</p>
        <p className="text-white text-xs">1,328.19</p>
        <p className="text-white text-xs">3,672.06</p>
        <p className="text-white text-xs">6,015.93</p>
      </div>
    </div>
  )
}

export default Graph
