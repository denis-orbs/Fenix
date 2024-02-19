import Decorator from '@/components/Common/Layout/Background'
import Vote from '@/components/Vote'

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
