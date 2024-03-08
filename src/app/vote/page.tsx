import Decorator from '@/src/components/Common/Layout/Background'
import Vote from '@/src/components/Vote'

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
