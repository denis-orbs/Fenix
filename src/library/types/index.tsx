export type Address = `0x${string}` | undefined
export interface IToken {
  id: number
  name: string
  symbol: string
  address: Address
  decimals: number
  img: string
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
