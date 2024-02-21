/* eslint-disable import/prefer-default-export */

export const NAV_LIST = [
  {
    name: 'Liquidity',
    description: 'The Best Price',
    icon: 'icon-swap',
    path: 'liquidity'
  },
  {
    name: 'Deposit',
    description: 'Set Your Price or Your Range',
    icon: 'icon-sand-clock',
    path: 'deposit',
  },
  {
    name: 'My Positions',
    description: 'Set and Forget',
    icon: 'icon-auto-graph',
    path: 'my-positions',
  },
]

export const DCA_PROCESS = [
  {
    description: 'Start select the token you want to spend, sell or exchange.',
    icon: 'icon-flag',
    status: 'active',
  },
  {
    description: 'Enter the amount of token you want to spend, sell or exchange',
    icon: 'icon-coin',
    status: 'active',
  },
  {
    description: 'Select the exit token you want to buy or exchange',
    icon: 'icon-coin',
    status: 'active',
  },
  {
    description: 'Select the frequency of purchase/sale of the tokens.',
    icon: 'icon-time-picker',
    status: 'active',
  },
  {
    description: 'Select the duration of the token purchase/sale.',
    icon: 'icon-date-time',
    status: 'inactive',
  },
  {
    description: 'Place order to submit the transaction',
    icon: 'icon-submit-document',
    status: 'inactive',
  },
]

export const TIME_OPTIONS = [
  {
    label: 'Seconds',
    value: 'seconds',
  },
  {
    label: 'Minutes',
    value: 'minutes',
  },
  {
    label: 'Hours',
    value: 'hours',
  },
  {
    label: 'Days',
    value: 'days',
  },
  {
    label: 'Weeks',
    value: 'weeks',
  },
  {
    label: 'Months',
    value: 'months',
  },
]
