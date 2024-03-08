import Decorator from '@/src/components/Common/Layout/Background'
import Lock from '@/src/components/Lock'

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
