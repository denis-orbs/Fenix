import Decorator from '@/src/library/components/Common/Layout/Background'
import Vote from '@/src/library/components/Vote'

const VotePage = () => {
  return (
    <main>
      <div className="container">
        <Vote />
        <Decorator/>
      </div>
    </main>
  )
}

export default VotePage
