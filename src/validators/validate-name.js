export function validateName(value, label = 'Nome') {
  if (!value || String(value).trim() === '') {
    return { valid: false, message: `${label} é obrigatório.` }
  }

  if (String(value).trim().length < 2) {
    return { valid: false, message: `${label} deve ter pelo menos 2 caracteres.` }
  }

  return { valid: true, message: '' }
}
