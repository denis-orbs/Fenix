const ListItemWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex gap-3">
      <div className="w-[57.224px] h-[57.224px] border border-shark-950 bg-shark-400 bg-opacity-40 rounded-xl flex-shrink-0 flex items-center justify-center">
        <span className="icon-send text-[30px] inline-block text-transparent bg-button-primary-hover bg-clip-text"></span>
      </div>
      <div>
        <div className="inline-block text-transparent bg-button-primary-hover bg-clip-text mb-2.5 font-medium text-[17px]">{title}</div>

        <div className="[&>p:not(:last-child)]:mb-[22px] [&>div:not(:last-child)]:mb-[22px] text-sm leading-normal ">{children}</div>
      </div>
    </div>
  )
}

export default ListItemWrapper
