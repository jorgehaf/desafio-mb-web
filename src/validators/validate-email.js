export function validateEmail(value) {
  if (!value || String(value).trim() === '') {
    return { valid: false, message: 'E-mail é obrigatório.' }
  }

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!pattern.test(String(value).trim())) {
    return { valid: false, message: 'Informe um e-mail válido.' }
  }

  return { valid: true, message: '' }
}
