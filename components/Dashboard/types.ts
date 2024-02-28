import { DATA_ROW } from '@/components/Liquidity/data'

export const PROPS_CLASSIC_LIQUIDITY = {
  titleHeader: 'In Wallet',
  titleHeader2: 'Emissions',
  titleButton: 'claim',
  titleButton2: 'Manage',
  activePagination: false,
  activeRange: false,
  filterData: DATA_ROW.filter((f) => f.type !== 'CONCENTRATED'),
  loading: false,
}

export const PROPS_CONCENTRATED_LIQUIDITY = {
  titleHeader: 'In Wallet',
  titleHeader2: 'Emissions',
  titleButton: 'claim',
  titleButton2: 'Manage',
  activePagination: false,
  activeRange: true,
  filterData: DATA_ROW.filter((f) => f.type === 'CONCENTRATED'),
  loading: false,
}

export const PROPS_HEADER_ROW_VOTE = {
  activeSlider: false,
  activeVote: false,
  activePagination: false,
  filterData: DATA_ROW,
  loading: false,
}
