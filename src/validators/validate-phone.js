import { unformatPhone } from '@/shared/format-phone.js'

export function validatePhone(value) {
  if (!value || String(value).trim() === '') {
    return { valid: false, message: 'Telefone é obrigatório.' }
  }

  const digits = unformatPhone(value)

  if (digits.length < 10 || digits.length > 11) {
    return { valid: false, message: 'Telefone deve conter 10 ou 11 dígitos.' }
  }

  return { valid: true, message: '' }
}
