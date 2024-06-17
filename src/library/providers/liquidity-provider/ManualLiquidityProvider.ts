import { fetchV3Positions } from '@/src/state/liquidity/reducer'
import { LiquidityProvider } from '.'
import { TokenDataProvider } from '../TokenDataProvider'
import { toBN } from '../../utils/numbers'
import { PoolProvider } from '../PoolProvider'

export class ManualLiquidityProvider extends LiquidityProvider {
  async getUserLiquidity(account: string) {
    const positions = await fetchV3Positions(account as `0x${string}`)
    const tokenPrices = await TokenDataProvider.getTokenPrices()
    let totalTVL = toBN(0)
    let boostedTVL = toBN(0)
    const promises = positions.map(async (position) => {
      const poolAddress = position.pool.id
      const amountToken0 = Number(position.depositedToken0)
      const amountToken1 = Number(position.depositedToken1)

      const priceToken0 = tokenPrices.find((price) => price.tokenAddress === position.token0.id)?.priceUSD
      const priceToken1 = tokenPrices.find((price) => price.tokenAddress === position.token1.id)?.priceUSD

      const positionValueToken0 = toBN(amountToken0).multipliedBy(priceToken0 || 0)
      const positionValueToken1 = toBN(amountToken1).multipliedBy(priceToken1 || 0)

      const positionValue = positionValueToken0.plus(positionValueToken1)
      const isBoostedPool = await PoolProvider.isBoostedPool(poolAddress)

      return { positionValue, isBoostedPool }
    })

    const results = await Promise.all(promises)

    results.forEach(({ positionValue, isBoostedPool }) => {
      totalTVL = totalTVL.plus(positionValue)
      if (isBoostedPool) {
        boostedTVL = boostedTVL.plus(positionValue)
      }
    })
    return {
      TVL: totalTVL.decimalPlaces(2).toString(),
      boostedTVL: boostedTVL.decimalPlaces(2).toString(),
    }
  }
}
