import { unformatCpf } from '@/shared/format-cpf.js'

export function validateCpf(value) {
  if (!value || String(value).trim() === '') {
    return { valid: false, message: 'CPF é obrigatório.' }
  }

  const digits = unformatCpf(value)

  if (digits.length !== 11) {
    return { valid: false, message: 'CPF deve conter 11 dígitos.' }
  }

  if (/^(\d)\1{10}$/.test(digits)) {
    return { valid: false, message: 'CPF inválido.' }
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i], 10) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(digits[9], 10)) {
    return { valid: false, message: 'CPF inválido.' }
  }

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i], 10) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(digits[10], 10)) {
    return { valid: false, message: 'CPF inválido.' }
  }

  return { valid: true, message: '' }
}
