import { http } from './http.js'
import { unformatCpf } from '@/shared/format-cpf.js'
import { unformatCnpj } from '@/shared/format-cnpj.js'
import { unformatPhone } from '@/shared/format-phone.js'

const ENDPOINT = '/registration'

function normalizePayload(formData) {
  const base = {
    email: formData.email.trim(),
    accountType: formData.accountType,
    phone: unformatPhone(formData.phone),
    password: formData.password
  }

  if (formData.accountType === 'PF') {
    return {
      ...base,
      name: formData.name.trim(),
      cpf: unformatCpf(formData.cpf),
      birthDate: formData.birthDate
    }
  }

  return {
    ...base,
    companyName: formData.companyName.trim(),
    cnpj: unformatCnpj(formData.cnpj),
    openingDate: formData.openingDate
  }
}

export async function submitRegistration(formData) {
  const payload = normalizePayload(formData)
  return http.post(ENDPOINT, payload)
}
