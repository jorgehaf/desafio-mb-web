import { unformatCnpj } from '@/shared/format-cnpj.js'

export function validateCnpj(value) {
  if (!value || String(value).trim() === '') {
    return { valid: false, message: 'CNPJ é obrigatório.' }
  }

  const digits = unformatCnpj(value)

  if (digits.length !== 14) {
    return { valid: false, message: 'CNPJ deve conter 14 dígitos.' }
  }

  if (/^(\d)\1{13}$/.test(digits)) {
    return { valid: false, message: 'CNPJ inválido.' }
  }

  const calcDigit = (str, weights) => {
    let sum = 0
    for (let i = 0; i < weights.length; i++) {
      sum += parseInt(str[i], 10) * weights[i]
    }
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const digit1 = calcDigit(digits, weights1)
  if (digit1 !== parseInt(digits[12], 10)) {
    return { valid: false, message: 'CNPJ inválido.' }
  }

  const digit2 = calcDigit(digits, weights2)
  if (digit2 !== parseInt(digits[13], 10)) {
    return { valid: false, message: 'CNPJ inválido.' }
  }

  return { valid: true, message: '' }
}
