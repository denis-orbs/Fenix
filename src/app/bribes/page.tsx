import Decorator from '@/src/components/Common/Layout/Background'
import Bribes from '@/src/components/Bribes'

const BribesPage = () => {
  return (
    <main className="container flex justify-center py-10 px-10">
      <Bribes />
      <Decorator />
    </main>
  )
}

export default BribesPage
