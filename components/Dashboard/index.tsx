import ActiveDashboard from './ActiveDashboard'
import InactiveDashboard from './InactiveDashboard'

const Dashboard = () => {
  return (
    <section className="relative my-10 mx-10">
      {/* <InactiveDashboard /> */}
      <ActiveDashboard/>
    </section>
  )
}

export default Dashboard
