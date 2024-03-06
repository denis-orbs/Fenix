import Decorator from '@/src/app/components/Common/Layout/Background'
import Vote from '@/src/app/components/Vote'

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
