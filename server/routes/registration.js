const express = require('express')
const path = require('path')
const router = express.Router()

const REQUIRED_PF_FIELDS = ['email', 'accountType', 'name', 'cpf', 'birthDate', 'phone', 'password']
const REQUIRED_PJ_FIELDS = ['email', 'accountType', 'companyName', 'cnpj', 'openingDate', 'phone', 'password']

function validatePayload(body) {
  const { accountType } = body

  if (!accountType || !['PF', 'PJ'].includes(accountType)) {
    return { valid: false, message: 'Tipo de cadastro inválido. Use PF ou PJ.' }
  }

  const requiredFields = accountType === 'PF' ? REQUIRED_PF_FIELDS : REQUIRED_PJ_FIELDS
  const missingFields = requiredFields.filter(field => {
    const value = body[field]
    return value === undefined || value === null || String(value).trim() === ''
  })

  if (missingFields.length > 0) {
    return {
      valid: false,
      message: `Campos obrigatórios não preenchidos: ${missingFields.join(', ')}`
    }
  }

  return { valid: true }
}

/**
 * GET /registration
 * Em produção serve o index.html gerado pelo Vite (Vue SPA).
 * Em desenvolvimento retorna JSON informativo (o Vite dev server cuida do HTML).
 */
router.get('/', (req, res) => {
  const isDev = process.env.NODE_ENV !== 'production'

  if (isDev) {
    return res.json({ message: 'Registration endpoint active. Open http://localhost:3000 for the client.' })
  }

  const indexPath = path.resolve(__dirname, '../../dist/index.html')
  res.sendFile(indexPath)
})

router.post('/', (req, res) => {
  const validation = validatePayload(req.body)

  if (!validation.valid) {
    return res.status(422).json({
      success: false,
      message: validation.message
    })
  }

  return res.status(201).json({
    success: true,
    message: 'Cadastro realizado com sucesso!',
    data: {
      email: req.body.email,
      accountType: req.body.accountType
    }
  })
})

module.exports = router
