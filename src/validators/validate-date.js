import { parseDateBR } from '@/shared/format-date.js'

export function validateBirthDate(value) {
  if (!value || String(value).trim() === '') {
    return { valid: false, message: 'Data de nascimento é obrigatória.' }
  }

  const date = parseDateBR(value)
  if (!date) {
    return { valid: false, message: 'Data de nascimento inválida.' }
  }

  const now = new Date()
  if (date > now) {
    return { valid: false, message: 'A data não pode ser no futuro.' }
  }

  const minYear = 1900
  if (date.getFullYear() < minYear) {
    return { valid: false, message: `Ano inválido.` }
  }

  return { valid: true, message: '' }
}

export function validateOpeningDate(value) {
  if (!value || String(value).trim() === '') {
    return { valid: false, message: 'Data de abertura é obrigatória.' }
  }

  const date = parseDateBR(value)
  if (!date) {
    return { valid: false, message: 'Data de abertura inválida.' }
  }

  const now = new Date()
  if (date > now) {
    return { valid: false, message: 'A data não pode ser no futuro.' }
  }

  return { valid: true, message: '' }
}
