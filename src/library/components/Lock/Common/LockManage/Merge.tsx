import ActiveVote from '@/src/library/components/Vote/ActiveVote'
import InactiveVote from '@/src/library/components/Vote/InactiveVote'

interface MergeProps {
  activeVote?: boolean
  handlerChange?: ()=> void
}

const Merge = ({ activeVote, handlerChange }: MergeProps) => {
  return <div>{activeVote ? <ActiveVote handlerChange={handlerChange} /> : <InactiveVote handlerChange={handlerChange}  />}</div>
}

export default Merge
