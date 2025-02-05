export const STEPS = [
  {
    label: 'Select your Pool',
    description: 'Select the pair that suits better your strategy.',
    icon: 'icon-circles',
  },
  {
    label: 'Deposit your Liquidity',
    description: 'The deeper the liquidity, the lower the slippage a pool will offer.',
    icon: 'icon-lock-up',
  },
  {
    label: 'Receive Benefits',
    description: 'Earn trading fees, Blast Points, Blast Gold and the Fenix Airdrop',
    icon: 'icon-rocket',
  },
]

export const EXCHANGE_LIST = [
  {
    label: 'Total Value Locked',
    description: '$0.00',
    icon: 'icon-lock',
  },
  {
    label: 'Fees',
    description: '$0.00',
    icon: 'icon-pig',
  },
  {
    label: 'Volume',
    description: '$0.00',
    icon: 'icon-coins',
  },
]

export const DATA_ROW = [
  {
    type: 'CONCENTRATED',
    APR: '35.00',
  },
  {
    type: 'CONCENTRATED',
    APR: '40.00',
  },
  {
    type: 'CONCENTRATED',
    APR: '48.00',
  },

  {
    type: 'STABLE',
    APR: '35.00',
  },
  {
    type: 'STABLE',
    APR: '40.00',
  },
  {
    type: 'STABLE',
    APR: '555.00',
  },
  {
    type: 'VOLATILE',
    APR: '35.00',
  },
  {
    type: 'VOLATILE',
    APR: '999.00',
  },
  {
    type: 'VOLATILE',
    APR: '48.00',
  },
]
// export const OPTIONS_FILTER = ['All Pools', 'Stable', 'Volatile', 'Concentrated']

export const OPTIONS_FILTER = ['All', 'Blue Chips', 'LST/LRT', 'Stables', 'Memes', 'Blast Native', 'Classic']

export const MEMES_POOLS = [
  '0x8e57e61b7524a2f56fd01bbfe5de9bb96ed186b4',
  '0xe3fac59382987466d7f812df56c50739b99a907a',
  '0x24b711e1d32e28a143e1a9cfdfe03a39d1acc771',
  '0x4a28f50f15efedf44af0d376fdc2e319fa8ccef8',
  '0x5083e43b015296c75de0af519917c035309e80e4',
  '0x90f2eaf2db0d8400c9f565aa3c139ddffbe857d0',
  '0x3acde0b7f51703c2fbf0a382f831123560b742b9',
]
export const LRTS_POOLS = [
  '0x3bafe103742da10a4fece8fc5e800df07d645439',
  '0xe53b1da56f90c9529f2db1bb8711c3f1cc6f03bd',
  '0x635512a1333ad0822f5ba4fd6479daa1df8b77e1',
  '0xbcf0265f4bd3cb293b709fab0bf5c83c7eeb6b74',
  '0x1eba6f6cfdb86e965040bf9e75d3ded9a3fd22a5',
  '0x46f2aa2aa7d31ddd237d620e52a33a8d5af2a5ab',
  '0x9304ba542df9bc61dd1c97c073ed35f81cab6149',
]

export const BLUE_CHIPS_POOLS = [
  '0x1d74611f3ef04e7252f7651526711a937aa1f75e',
  '0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f',
  '0xf4f76fc7ae409862eca9ffdb1767638e7dcd6e8b',
]

export const STABLES_POOLS = [
  '0x28d7de5e9592cbd951dc3b22325fdfa89972f6db',
  '0xd0cd894c605a9eedacbc0fa9bd8440627a5d37b1',
  '0xb5909f3c47557d0eef11503199fc12c1252ab15a',
  '0xd49ad1dd6c5eae53abdafeaed1866330c42ccae4',
  '0x6a1de1841c5c3712e3bc7c75ce3d57dedec6915f',
  ,
]

export const BLAST_NATIVE_POOLS = [
  '0x28abbaadfacd46196217c23bc6402a0a458973a5',
  '0x7113c00b5275b0b9c16686e5ac1164978b505c5d',
  '0xbad7a5de96b7df589252ced73426d4b59f90b466',
  '0x3a8fa7bdbb3bd2a523796b145e5dd23b45019dbe',
  '0x21d5d5998c3d0feea70b5980fdac9dd6b8a12761',
  '0xb50a80bba0ff07f4bc3434c593e86663fe05abe2',
  '0x54bb102e85ee68a234fa06ece299346941d68d07',
  '0x9508122abdd654b68c7dbf5bdba329b852e4a512',
  '0x047d5d8911d18aa5e64e666e53af2b47b46ab363',
  '0xc1fd5e0b3388c66dfad458ded01dcddae68cb03e',
]
export const CLASSIC = [
  '0xf4f76fc7ae409862eca9ffdb1767638e7dcd6e8b',
  '0xd49ad1dd6c5eae53abdafeaed1866330c42ccae4',
  '0x3c7fd63cab763a10b2754b1464e09d37a9fc79e7',
  '0x8c22d23ec102c9e098c8e0b9ed4ea01aa0b4be35',
  '0xb5909f3c47557d0eef11503199fc12c1252ab15a',
]

export const NAV_LIST = [
  {
    name: 'Liquidity',
    description: 'Deposit or Withdraw',
    icon: 'icon-swap',
    path: '/liquidity',
    active: true,
  },
  // {
  //   name: 'Deposit',
  //   description: 'Set Your Price or Your Range',
  //   icon: 'icon-sand-clock',
  //   path: '/liquidity',
  //   active: true,
  // },
  {
    name: 'My Positions',
    description: 'Check your position',
    icon: 'icon-auto-graph',
    path: '/dashboard',
    active: true,
  },
]
