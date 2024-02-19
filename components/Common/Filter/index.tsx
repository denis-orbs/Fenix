'use client'

import { Button } from '@/components/UI'

export enum FilterTabs {
  CONCENTRATED = 'CONCENTRATED',
  STABLE = 'STABLE',
  VOLATILE = 'VOLATILE',
  SINGLE_TOKEN_DEPOSIT = 'SINGLE_TOKEN_DEPOSIT',
  ALL_POOLS = 'ALL_POOLS',
}

const Filter = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: FilterTabs
  setCurrentTab: (tab: FilterTabs) => void
}) => {
  return (
    <div
      className="flex flex-col xl:flex-row items-center gap-2 px-3 py-2 filter-box 
    rounded-lg justify-start md:gap-5 w-full xl:w-2/3  bg-opacity-40"
    >
      <Button
        variant={currentTab === FilterTabs.CONCENTRATED ? undefined : 'default'}
        onClick={() => setCurrentTab(FilterTabs.CONCENTRATED)}
        className="h-[40px] md:h-auto w-full xl-w-auto"
      >
        Concentrated
      </Button>
      <Button
        variant={currentTab === FilterTabs.STABLE ? undefined : 'default'}
        onClick={() => setCurrentTab(FilterTabs.STABLE)}
        className="h-[40px] md:h-auto w-full xl-w-auto "
      >
        Stable
      </Button>
      <Button
        variant={currentTab === FilterTabs.VOLATILE ? undefined : 'default'}
        onClick={() => setCurrentTab(FilterTabs.VOLATILE)}
        className="h-[40px] md:h-auto w-full xl-w-auto"
      >
        Volatile
      </Button>
      <Button
        variant={currentTab === FilterTabs.SINGLE_TOKEN_DEPOSIT ? undefined : 'default'}
        onClick={() => setCurrentTab(FilterTabs.SINGLE_TOKEN_DEPOSIT)}
        className="h-[40px] md:h-auto w-full xl-w-auto"
      >
        Single Token Deposit
      </Button>
      <Button
        variant={currentTab === FilterTabs.ALL_POOLS ? undefined : 'default'}
        onClick={() => setCurrentTab(FilterTabs.ALL_POOLS)}
        className="h-[40px] md:h-auto w-full xl-w-auto"
      >
        All Pools
      </Button>
    </div>
  )
}

export default Filter
