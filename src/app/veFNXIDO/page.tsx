import Decorator from '@/src/components/Common/Layout/Background'
import VeFNXIDO from '@/src/components/VeFNXIDO'

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
