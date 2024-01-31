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
    <section>
      <div className="flex items-center gap-5">
        <Migration />
        <Steps steps={STEPS} />
      </div>
      <Overview />
    </section>
  )
}

export default Claim
