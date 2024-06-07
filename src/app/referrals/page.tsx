import Decorator from '@/src/components/Common/Layout/Background'
import ReferralDecorator from '@/src/components/Common/Layout/BackgroundReferral'
import Referrals from '@/src/components/referrals'

const ReferralsPage = () => {
  return (
    <main className="container relative pt-5 overflow-hidden">
      <ReferralDecorator />
      <Referrals />
      <Decorator />
    </main>
  )
}

export default ReferralsPage
