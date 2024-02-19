import Decorator from '@/components/Common/Layout/Background'
import Lock from '@/components/Lock'

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
