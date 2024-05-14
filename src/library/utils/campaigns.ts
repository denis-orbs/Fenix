export const totalCampaigns = [
  {
    campaignId: '0xbb1b3804878e84101119520d2b0201728e2b049b293f91c0db881f5818ab9fc8',
    pairAddress: '0x1D74611f3EF04E7252f7651526711a937Aa1f75e',
    multiplier: '🔥 9x Rings',
  },
  {
    campaignId: '0x81deedbabbc2886bce9c483b8161503b989a1179ac2d5f3e9c3e044e1337ce79',
    pairAddress: '0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f',
    multiplier: '🔥 1x Rings',
  },
  {
    campaignId: '0xf9672c6a04bd1d0c5d42bb8041ba2647e25ec4f4c93eb285f22da46dbf0eb2ba',
    pairAddress: '0xc5910a7f3b0119ac1a3ad7A268CcE4A62d8C882D',
    multiplier: '🔥 1x Rings',
  },
  {
    campaignId: '0xedeffb6dff361531155be42f35ac7e2e7974174824458b2a6eefa08f7fca1e05',
    pairAddress: '0x6A1DE1841c5c3712E3Bc7C75Ce3d57DEDEC6915F',
    multiplier: '🔥 1x Rings',
  },
  {
    campaignId: '0xb7301dd3875f4fffb03cb68ecb944675c14d26aac4d6daa6e69016006bde3e73',
    pairAddress: '0x3bafe103742da10a4fece8fc5e800df07d645439',
    multiplier: '🔥 3x Rings',
  },
  {
    campaignId: '0xbdbcf3809cfbb2763b0562a0f15ca76dfa76166c1a7e823dcc1d258864762fc4',
    pairAddress: '0x117106000ceb709ba3ec885027d111463204d6b6',
    multiplier: '🔥 1x Rings',
  },
  {
    campaignId: '0x0d32968a80f922fd5c73939abfb0f71da8c703de89de0064b0ccd3b7c96692a8',
    pairAddress: '0xce274e4ae83baadd1d3b88e1ed24886e05aca345',
    multiplier: '🔥 0.3x Rings',
  },
  {
    campaignId: '0x7277168485aab4963288b98bc4122b33e0ce9e664a9e02188687fa3a1a3c8e85',
    pairAddress: '0xf2bb3403e80adc9272c43b386c76e54d5bb604a5',
    multiplier: '🔥 0.3x Rings',
  },
  {
    campaignId: '0x287e73db592afce24ab76f5c4f0ddc46f2aa4f373dc92c7e00f6541ba090425e',
    pairAddress: '0xCf68cdFea89f9E6964d4c2bD8a42EBA5da9F945D',
    multiplier: '🔥 0.5x Rings',
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
