import Decorator from '@/src/app/components/Common/Layout/Background'
import Lock from '@/src/app/components/Lock'

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
