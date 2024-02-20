/* eslint-disable import/prefer-default-export */

export const NAV_LIST = [
  {
    name: 'Swap',
    description: 'The Best Price',
    icon: 'icon-swap',
    path: 'swap',
  },
  {
    name: 'DCA',
    description: 'Set and Forget',
    icon: 'icon-sand-clock',
    path: 'dca',
  },
  {
    name: 'Limit / Range Orders',
    description: 'Set Your Price or Your Range',
    icon: 'icon-auto-graph',
    path: 'range',
  },
  {
    name: 'Recurring Orders',
    description: 'Create, buy and sell orders within a range',
    icon: 'icon-recurring',
    path: 'recurring',
  },
  {
    name: 'Bridge',
    description: 'Transfer assets to Blast',
    icon: 'icon-bridge',
    path: 'bridge',
  },
  {
    name: 'Perpetuals',
    description: 'Perpetuals Aggregator',
    icon: 'icon-chart-stock',
    path: 'perpetuals',
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

export const RECURRING_PROCESS = [
  {
    description: 'Start by selecting the pair you want to trade',
    icon: 'icon-flag',
    status: 'active',
  },
  {
    description: 'Choose the type of order, either limit or range.',
    icon: 'icon-coin',
    status: 'active',
  },
  {
    description: 'Select the price and token at which you want to buy',
    icon: 'icon-coin-received',
    status: 'inactive',
  },
  {
    description: 'Select the price and token at which you want to sell',
    icon: 'icon-coin-received',
    status: 'inactive',
  },
  {
    description: 'Make sure all the information is correct',
    icon: 'icon-check',
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
