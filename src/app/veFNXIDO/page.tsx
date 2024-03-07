import Decorator from '@/src/app/components/Common/Layout/Background'
import VeFNXIDO from '@/src/app/components/VeFNXIDO'

const veFNXIDOPage = () => {
  return (
    <main>
      <div className="container">
        <VeFNXIDO />
        <Decorator/>
      </div>
    </main>
  )
}

export default veFNXIDOPage
