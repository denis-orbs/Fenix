import { positions } from '@/src/components/Dashboard/MyStrategies/Strategy'

export async function getPositionAPR(
  liquidity: String,
  position: any,
  pool: any,
  poolFeeData: any,
  nativePrice: string | never[]
) {
  if (!pool || !poolFeeData || !nativePrice) return

  try {
    const poolDayFees =
      poolFeeData && poolFeeData.length
        ? poolFeeData.reduce((acc: number, day: any) => {
            return acc + Number(day?.feesUSD || 0)
          }, 0) / Math.min(7, poolFeeData.length)
        : 0

    // Avg fees
    // const poolDayFees = poolFeeData && Boolean(poolFeeData.length) && poolFeeData.reduce((acc, v) => acc + Number(v.feesUSD), 0) / poolFeeData.length

    const yearFee = poolDayFees && poolDayFees * 365

    const liquidityRelation = position && liquidity && Number(position.liquidity.toString()) / Number(liquidity)

    const [amount0, amount1] = position ? [position.depositedToken0, position.depositedToken0] : [0, 0]

    const tvl =
      pool &&
      Number(pool.token0.derivedMatic) * Number(nativePrice) * Number(amount0) +
        Number(pool.token1.derivedMatic) * Number(nativePrice) * Number(amount1)
    //
    return liquidityRelation && yearFee && tvl && ((yearFee * liquidityRelation) / tvl) * 100
  } catch {
    return 0
  }
}
export async function getPositionFees(
  liquidity: String,
  position: positions,
  pool: any,
  poolFeeData: any,
  nativePrice: string | never[]
) {
  if (!pool || !poolFeeData || !nativePrice) return

  try {
    //

    // Today fees
    const poolDayFees = poolFeeData && Boolean(poolFeeData.length) && Number(poolFeeData[0].feesUSD)

    // Avg fees
    // const poolDayFees = poolFeeData && Boolean(poolFeeData.length) && poolFeeData.reduce((acc, v) => acc + Number(v.feesUSD), 0) / poolFeeData.length

    const yearFee = poolDayFees && poolDayFees * 365

    const liquidityRelation = position && liquidity && Number(position.liquidity.toString()) / Number(liquidity)

    const [amount0, amount1] = position ? [position.depositedToken0, position.depositedToken0] : [0, 0]

    const tvl =
      pool &&
      Number(pool.token0.derivedMatic) * Number(nativePrice) * Number(amount0) +
        Number(pool.token1.derivedMatic) * Number(nativePrice) * Number(amount1)
    //
    return liquidityRelation && yearFee && tvl && ((yearFee * liquidityRelation) / tvl) * 100
  } catch {
    return 0
  }
}
