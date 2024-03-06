import Decorator from '@/src/library/components/Common/Layout/Background'
import VeFNXIDO from '@/src/library/components/VeFNXIDO'

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
