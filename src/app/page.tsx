import React from 'react'
import Landing from '@/src/library/components/Landing'

import Main from '@/src/library/components/Landing/Main'

const HomePage = () => {
  return (
    <main>
      <div className="py-10 mx-auto">
        <Main />
        <Landing />
      </div>
    </main>
  )
}

export default HomePage
