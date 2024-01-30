const TableTd = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`flex basis-[100%] flex-grow p-2.5 ${className}`}>{children}</div>
}

export default TableTd
