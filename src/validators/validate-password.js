export function validatePassword(value) {
  if (!value || String(value).trim() === '') {
    return { valid: false, message: 'Senha é obrigatória.' }
  }

  if (value.length < 8) {
    return { valid: false, message: 'A senha deve ter no mínimo 8 caracteres.' }
  }

  if (!/[A-Z]/.test(value)) {
    return { valid: false, message: 'A senha deve conter pelo menos uma letra maiúscula.' }
  }

  if (!/[a-z]/.test(value)) {
    return { valid: false, message: 'A senha deve conter pelo menos uma letra minúscula.' }
  }

  if (!/[0-9]/.test(value)) {
    return { valid: false, message: 'A senha deve conter pelo menos um número.' }
  }

  return { valid: true, message: '' }
}
