import Decorator from '@/src/library/components/Common/Layout/Background'
import Lock from '@/src/library/components/Lock'

const LockPage = () => {
  return (
    <main>
      <div className="container">
        <Lock />
        <Decorator/>
      </div>
    </main>
  )
}

export default LockPage
