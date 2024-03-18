export interface IToken {
  id?: number // make mandatory
  name: string
  symbol: string
  address?: string // make mandatory
  decimals?: number // make mandatory
}
export interface IOption {
  label: string
  value: string
}

export interface IStep {
  description: string
  label?: string
  icon: string
  status?: string
}
