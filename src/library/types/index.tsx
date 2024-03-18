export type Address = `0x${string}` | undefined | null
export interface IToken {
  id?: number // make mandatory
  name: string
  symbol: string
  address?: Address // make mandatory
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
