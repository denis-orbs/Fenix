'use client'

import Migration from '@/components/Claim/Migration'
import Steps from '@/components/Common/Steps'
import Overview from '@/components/Claim/Overview'

const STEPS = [
  {
    title: 'Check your Wallet',
    description: 'Sign in with your wallet to check your CHR ecosystem tokens balances.',
    icon: 'icon-wallet',
  },
  {
    title: 'Migrate your Tokens',
    description: 'Select your CHR ecosystem tokens and migrate them to veFNX.',
    icon: 'icon-circles',
  },
  {
    title: 'Migration',
    description: 'Your veFNX tokens will be airdropped a week before the launch of Fenix to the wallet you used for the migration.',
    icon: 'icon-download',
  },
]

const Claim = () => {
  return (
    <section className="px-3 md:px-0">
      <div className="flex items-center gap-6 justify-between flex-col md:flex-row mb-10 md:mb-0">
        <Migration />
        <Steps steps={STEPS} />
      </div>
      <Overview />
    </section>
  )
}

export default Claim
