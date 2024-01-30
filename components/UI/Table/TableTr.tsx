const TableTr = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`flex rounded-[10px] border border-shark-950 bg-shark-400 bg-opacity-20 px-1.5 py-2.5 ${className}`}>
      {children}
    </div>
  )
}

export default TableTr
