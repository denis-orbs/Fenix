const TableBody = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`flex flex-col gap-[15px] text-white  ${className}`}>{children}</div>
}

export default TableBody
