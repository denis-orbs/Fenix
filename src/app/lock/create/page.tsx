import Decorator from "@/src/components/Common/Layout/Background"
import CreateLock from "@/src/components/Lock/CreateLock"

const CreateLockPage = () => {
  return (
    <main className="container flex flex-col items-center justify-center py-10 px-10">
      <div className="box-notification p-5  justify-between rounded-lg w-2/5 mb-5 me-20 hidden xl:flex">
        <div className="flex items-center gap-2 w-2/3 ">
          <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
            <span className="inline-block text-2xl text-gradient icon-bell"></span>
          </div>
          <p className="text-shark-100 text-xs">
            Create a Lock for more than 2 years and enjoy the benefits of our APR Performance.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-shark-100 text-xs">Current APR</p>
          <p className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
            0.00%
          </p>
        </div>
      </div>
      <CreateLock />
      <Decorator />
    </main>
  )
}

export default CreateLockPage