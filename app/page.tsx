import React from 'react'
import Landing from '@/components/Landing'

import Main from '@/components/Landing/Main'

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
