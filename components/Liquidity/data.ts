export const STEPS = [
  {
    title: 'Select your Pool',
    description: 'Select the pair that suits better your strategy.',
    icon: 'icon-circles',
  },
  {
    title: 'Deposit your Liquidity',
    description: 'The deeper the liquidity (TVL), the lower the slippage a pool will offer.',
    icon: 'icon-lock-up',
  },
  {
    title: 'Receive Benefits',
    description:
      'LPs get FNX emissions, while veFNX lockers get the pool trading fees as an incentive to vote on the most productive pools.',
    icon: 'icon-rocket',
  },
]

export const EXCHANGE_LIST = [
  {
    label: 'Total Value Locked',
    amount: 9283732732,
    icon: 'icon-lock',
  },
  {
    label: 'Fees',
    amount: 6478944582,
    icon: 'icon-pig',
  },
  {
    label: 'Volume',
    amount: 4868076544,
    icon: 'icon-coins',
  },
]

export const DATA_ROW = [
  {
    type: "CONCENTRATED",
    APR: "35.00"
  },
  {
    type: "CONCENTRATED",
    APR: "40.00"
  },
  {
    type: "CONCENTRATED",
    APR: "48.00"
  },

  {
    type: "STABLE",
    APR: "35.00"
  },
  {
    type: "STABLE",
    APR: "40.00"
  },
  {
    type: "STABLE",
    APR: "555.00"
  },
  {
    type: "VOLATILE",
    APR: "35.00"
  },
  {
    type: "VOLATILE",
    APR: "999.00"
  },
  {
    type: "VOLATILE",
    APR: "48.00"
  },
]

export const OPTIONS_FILTER = ["Concentrated", "Stable", "Volatile", "Single Token Deposit", "All Pools"]

export const NAV_LIST = [
  {
    name: 'Liquidity',
    description: 'The Best Price',
    icon: 'icon-swap',
    path: '/liquidity',
    active: true,
  },
  {
    name: 'Deposit',
    description: 'Set Your Price or Your Range',
    icon: 'icon-sand-clock',
    path: 'deposit',
    active: true,
  },
  {
    name: 'My Positions',
    description: 'Set and Forget',
    icon: 'icon-auto-graph',
    path: 'positions',
    active: true,
  },
]
