import Landing from '@/src/components/Landing'

import Main from '@/src/components/Landing/Main'
export const metadata = {
  title: 'Fenix Finance',
}
const HomePage = () => {
  return (
    <main>
      <div className="pt-10 mx-auto">
        <Main/>
        <Landing />
      </div>
    </main>
  )
}

export default HomePage
