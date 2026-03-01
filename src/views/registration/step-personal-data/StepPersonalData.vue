<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import './step-personal-data.large.css'
import './step-personal-data.small.css'
import FormInput from '@/components/form-input/FormInput.vue'
import BaseButton from '@/components/base-button/BaseButton.vue'
import { formatCpf } from '@/shared/format-cpf.js'
import { formatCnpj } from '@/shared/format-cnpj.js'
import { formatPhone } from '@/shared/format-phone.js'
import { formatDate } from '@/shared/format-date.js'
import { validateCpf } from '@/validators/validate-cpf.js'
import { validateCnpj } from '@/validators/validate-cnpj.js'
import { validatePhone } from '@/validators/validate-phone.js'
import { validateBirthDate, validateOpeningDate } from '@/validators/validate-date.js'
import { validateName } from '@/validators/validate-name.js'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update'])

const router = useRouter()

const isPF = computed(() => props.formData.accountType === 'PF')

const form = reactive({
  name: props.formData.name || '',
  cpf: props.formData.cpf || '',
  birthDate: props.formData.birthDate || '',
  companyName: props.formData.companyName || '',
  cnpj: props.formData.cnpj || '',
  openingDate: props.formData.openingDate || '',
  phone: props.formData.phone || ''
})

const errors = reactive({
  name: '',
  cpf: '',
  birthDate: '',
  companyName: '',
  cnpj: '',
  openingDate: '',
  phone: ''
})

function applyMask(field, formatter, event) {
  form[field] = formatter(event.target.value)
}

function validateField(field) {
  if (isPF.value) {
    if (field === 'name') errors.name = validateName(form.name, 'Nome').message
    if (field === 'cpf') errors.cpf = validateCpf(form.cpf).message
    if (field === 'birthDate') errors.birthDate = validateBirthDate(form.birthDate).message
    if (field === 'phone') errors.phone = validatePhone(form.phone).message
  } else {
    if (field === 'companyName') errors.companyName = validateName(form.companyName, 'Razão social').message
    if (field === 'cnpj') errors.cnpj = validateCnpj(form.cnpj).message
    if (field === 'openingDate') errors.openingDate = validateOpeningDate(form.openingDate).message
    if (field === 'phone') errors.phone = validatePhone(form.phone).message
  }
}

function validateForm() {
  if (isPF.value) {
    errors.name = validateName(form.name, 'Nome').message
    errors.cpf = validateCpf(form.cpf).message
    errors.birthDate = validateBirthDate(form.birthDate).message
    errors.phone = validatePhone(form.phone).message
    return !errors.name && !errors.cpf && !errors.birthDate && !errors.phone
  }

  errors.companyName = validateName(form.companyName, 'Razão social').message
  errors.cnpj = validateCnpj(form.cnpj).message
  errors.openingDate = validateOpeningDate(form.openingDate).message
  errors.phone = validatePhone(form.phone).message
  return !errors.companyName && !errors.cnpj && !errors.openingDate && !errors.phone
}

function onContinue() {
  if (!validateForm()) return
  emit('update', { ...form })
  router.push('/registration/password')
}

function onBack() {
  router.push('/registration/email')
}
</script>

<template>
  <div class="step-personal-data">
    <div>
      <h2 class="step-personal-data__title">Dados cadastrais</h2>
      <p class="step-personal-data__subtitle">
        {{ isPF ? 'Preencha seus dados pessoais.' : 'Preencha os dados da empresa.' }}
      </p>
    </div>

    <!-- Pessoa Física -->
    <template v-if="isPF">
      <div class="step-personal-data__fields">
        <FormInput
          v-model="form.name"
          label="Nome completo"
          placeholder="Seu nome completo"
          :error="errors.name"
          :required="true"
          autocomplete="name"
          @blur="validateField('name')"
        />

        <div class="step-personal-data__row">
          <FormInput
            v-model="form.cpf"
            label="CPF"
            placeholder="000.000.000-00"
            :error="errors.cpf"
            :required="true"
            inputmode="numeric"
            maxlength="14"
            @input="(e) => applyMask('cpf', formatCpf, e)"
            @blur="validateField('cpf')"
          />

          <FormInput
            v-model="form.birthDate"
            label="Data de nascimento"
            placeholder="DD/MM/AAAA"
            :error="errors.birthDate"
            :required="true"
            inputmode="numeric"
            maxlength="10"
            @input="(e) => applyMask('birthDate', formatDate, e)"
            @blur="validateField('birthDate')"
          />
        </div>

        <FormInput
          v-model="form.phone"
          label="Telefone"
          placeholder="(00) 00000-0000"
          :error="errors.phone"
          :required="true"
          inputmode="tel"
          maxlength="15"
          autocomplete="tel"
          @input="(e) => applyMask('phone', formatPhone, e)"
          @blur="validateField('phone')"
        />
      </div>
    </template>

    <!-- Pessoa Jurídica -->
    <template v-else>
      <div class="step-personal-data__fields">
        <FormInput
          v-model="form.companyName"
          label="Razão social"
          placeholder="Nome da empresa"
          :error="errors.companyName"
          :required="true"
          autocomplete="organization"
          @blur="validateField('companyName')"
        />

        <div class="step-personal-data__row">
          <FormInput
            v-model="form.cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            :error="errors.cnpj"
            :required="true"
            inputmode="numeric"
            maxlength="18"
            @input="(e) => applyMask('cnpj', formatCnpj, e)"
            @blur="validateField('cnpj')"
          />

          <FormInput
            v-model="form.openingDate"
            label="Data de abertura"
            placeholder="DD/MM/AAAA"
            :error="errors.openingDate"
            :required="true"
            inputmode="numeric"
            maxlength="10"
            @input="(e) => applyMask('openingDate', formatDate, e)"
            @blur="validateField('openingDate')"
          />
        </div>

        <FormInput
          v-model="form.phone"
          label="Telefone"
          placeholder="(00) 00000-0000"
          :error="errors.phone"
          :required="true"
          inputmode="tel"
          maxlength="15"
          autocomplete="tel"
          @input="(e) => applyMask('phone', formatPhone, e)"
          @blur="validateField('phone')"
        />
      </div>
    </template>

    <div class="step-personal-data__actions">
      <BaseButton variant="ghost" @click="onBack">Voltar</BaseButton>
      <BaseButton variant="primary" @click="onContinue">Continuar</BaseButton>
    </div>
  </div>
</template>
