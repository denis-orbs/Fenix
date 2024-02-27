import Decorator from '@/components/Common/Layout/Background'
import Dashboard from '@/components/Dashboard'

const DashboardPage = () => {
  return (
    <main>
      <div className="container">
        <Dashboard/>
        <Decorator />
      </div>
    </main>
  )
}

export default DashboardPage
