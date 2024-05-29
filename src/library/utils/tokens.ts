export function adjustTokenOrder(token0Symbol: string, token1Symbol: string) {
  const isToken0WETH = token0Symbol === 'WETH'
  const isToken1WETH = token1Symbol === 'WETH'
  if (isToken0WETH) return [token1Symbol, token0Symbol]
  if (isToken1WETH) return [token0Symbol, token1Symbol]
  return [token0Symbol, token1Symbol]
}
