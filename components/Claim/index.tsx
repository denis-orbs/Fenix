'use client'

import Migration from '@/components/Claim/Migration'
import Steps from '@/components/Common/Steps'
import Overview from '@/components/Claim/Overview'

const STEPS = [
  {
    title: 'Check your Wallet',
    description: 'Sign your wallet in order to check your CHR Balance.',
    icon: 'icon-wallet',
  },
  {
    title: 'Migrate your Tokens',
    description: 'Select your CHR tokens and migrate them to FNX.',
    icon: 'icon-circles',
  },
  {
    title: 'Withdraw your new Tokens',
    description: 'Withdraw your new FNX tokens to your wallet!',
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
