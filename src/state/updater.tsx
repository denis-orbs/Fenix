import LiquidityUpdater from './liquidity/updater'
import UserUpdater from './user/updater'

export default function AppUpdater() {
  return (
    <>
      <LiquidityUpdater />
      <UserUpdater />
    </>
  )
}
