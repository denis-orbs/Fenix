import Decorator from "@/src/components/Common/Layout/Background"
import CreateLock from "@/src/components/Lock/CreateLock"

const CreateLockPage = () => {
  return (
    <main className="container relative flex flex-col items-center justify-center pb-20 ">
      <CreateLock />
      <Decorator />
    </main>
  )
}

export default CreateLockPage