export function formatDate(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export function unformatDate(value) {
  return String(value).replace(/\D/g, '')
}

export function parseDateBR(value) {
  const digits = unformatDate(value)
  if (digits.length !== 8) return null

  const day = parseInt(digits.slice(0, 2), 10)
  const month = parseInt(digits.slice(2, 4), 10) - 1
  const year = parseInt(digits.slice(4, 8), 10)

  const date = new Date(year, month, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}
