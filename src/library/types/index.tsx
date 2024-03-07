export interface IToken {
  name: string
  symbol: string
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
