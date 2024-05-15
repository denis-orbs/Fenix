type PointStackType = 'fenix-ring' | 'blast' | 'blast-gold'
export interface Campaign {
  campaignId: string
  pairAddress: string
  multiplier: string
  pointStack?: PointStackType[]
}
export const totalCampaigns: Campaign[] = [
  {
    campaignId: '0x589250145805b13deb9d0a0f05f3c7597346a096a3a33bd485acead34532f143',
    pairAddress: '0x1D74611f3EF04E7252f7651526711a937Aa1f75e',
    multiplier: '🔥 Ring Boost' /* '9x Rings' */,
    pointStack: ['fenix-ring', 'blast', 'blast-gold'],
  },
  {
    campaignId: '0xf1b0990937b2f7a678d312cdace2e7392a6a1ad48691311d55198c20002a4d6e',
    pairAddress: '0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f',
    multiplier: '🔥 Ring Boost' /* '🔥 1x Rings' */,
    pointStack: ['fenix-ring', 'blast'],
  },
  {
    campaignId: '0x7b57ece7550497c2ea82d8a328bdb734e483eb16f35835d816b38f34465724e6',
    pairAddress: '0xc5910a7f3b0119ac1a3ad7A268CcE4A62d8C882D',
    multiplier: '🔥 Ring Boost' /* '🔥 1x Rings' */,
    pointStack: ['fenix-ring', 'blast'],
  },
  {
    campaignId: '0x4376c4ba823e2e34d7331d5ebf2b0d587f87fe2ea505a7bca002b759f3e54bb3',
    pairAddress: '0x6A1DE1841c5c3712E3Bc7C75Ce3d57DEDEC6915F',
    multiplier: '🔥 Ring Boost' /* '🔥 1x Rings' */,
    pointStack: ['fenix-ring', 'blast'],
  },
  {
    campaignId: '0xa128688d9658a10ead4ef4ba0ca1ed9a9ce11d6e2eb9d010ad5093e4610568c5',
    pairAddress: '0x3bafe103742da10a4fece8fc5e800df07d645439',
    multiplier: '🔥 Ring Boost' /* '🔥 3x Rings' */,
    pointStack: ['fenix-ring', 'blast'],
  },
  {
    campaignId: '0xe135f73dd902f9618148bf0c5906ac6e1b0d515af262e52c5a7aff8619885056',
    pairAddress: '0x117106000ceb709ba3ec885027d111463204d6b6',
    multiplier: '🔥 Ring Boost' /* '🔥 1x Rings' */,
    pointStack: ['fenix-ring', 'blast'],
  },
  // {
  //   campaignId: '',
  //   pairAddress: '0xce274e4ae83baadd1d3b88e1ed24886e05aca345',
  //   multiplier: '🔥 Ring Boost' /* '🔥 0.3x Rings' */,
  //   pointStack: ['fenix-ring', 'blast'],
  // },
  {
    campaignId: '0x7c7d58fde697e41f3600acbf7ca827d32854364ceef3c1ff6a02a296d13c78ae',
    pairAddress: '0xf2bb3403e80adc9272c43b386c76e54d5bb604a5',
    multiplier: '🔥 Ring Boost' /* '🔥 0.3x Rings' */,
    pointStack: ['fenix-ring', 'blast'],
  },
  {
    campaignId: '0x09769f77b2a779cf766fbc76e6a37e82aa866cd0fe515133ea79913a47577088',
    pairAddress: '0xCf68cdFea89f9E6964d4c2bD8a42EBA5da9F945D',
    multiplier: '🔥 Ring Boost' /* '🔥 0.5x Rings' */,
    pointStack: ['fenix-ring', 'blast'],
  },
]

export const getPointsDistributionTargetTimestamps = () => {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth()
  const day = now.getUTCDate()
  // This is the hours where the cron that updates the points runs
  const times = [
    '17:00:00', // 05:00 PM UTC
    '01:00:00', // 01:00 AM UTC
    '09:00:00', // 09:00 AM UTC
  ]

  return times.map((time) => new Date(Date.UTC(year, month, day, ...time.split(':').map(Number))))
}
