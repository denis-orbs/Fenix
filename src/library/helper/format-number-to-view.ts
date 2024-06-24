export default function formatNumberToView(value: string | number, n = 6): string {
  return value.toString()
    .replace(`(\d*\.\d{0,${n}})\d*`, '')
    .replace(/(\.\d*?[1-9])0+$/, '$1')
    .replace(/(^0+)?(\d+)/, '$2')
}
