<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import './step-review.large.css'
import './step-review.small.css'
import FormInput from '@/components/form-input/FormInput.vue'
import RadioGroup from '@/components/radio-group/RadioGroup.vue'
import BaseButton from '@/components/base-button/BaseButton.vue'
import { formatCpf } from '@/shared/format-cpf.js'
import { formatCnpj } from '@/shared/format-cnpj.js'
import { formatPhone } from '@/shared/format-phone.js'
import { formatDate } from '@/shared/format-date.js'
import { validateEmail } from '@/validators/validate-email.js'
import { validateCpf } from '@/validators/validate-cpf.js'
import { validateCnpj } from '@/validators/validate-cnpj.js'
import { validatePhone } from '@/validators/validate-phone.js'
import { validateBirthDate, validateOpeningDate } from '@/validators/validate-date.js'
import { validatePassword } from '@/validators/validate-password.js'
import { validateName } from '@/validators/validate-name.js'

const ACCOUNT_TYPE_OPTIONS = [
  { value: 'PF', label: 'Pessoa Física' },
  { value: 'PJ', label: 'Pessoa Jurídica' }
]

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  submitError: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update', 'submit'])

const router = useRouter()

const isPF = computed(() => form.accountType === 'PF')

const form = reactive({ ...props.formData })

const errors = reactive({
  email: '',
  accountType: '',
  name: '',
  cpf: '',
  birthDate: '',
  companyName: '',
  cnpj: '',
  openingDate: '',
  phone: '',
  password: ''
})

function applyMask(field, formatter, event) {
  form[field] = formatter(event.target.value)
}

function validateField(field) {
  switch (field) {
    case 'email': errors.email = validateEmail(form.email).message; break
    case 'name': errors.name = validateName(form.name, 'Nome').message; break
    case 'cpf': errors.cpf = validateCpf(form.cpf).message; break
    case 'birthDate': errors.birthDate = validateBirthDate(form.birthDate).message; break
    case 'companyName': errors.companyName = validateName(form.companyName, 'Razão social').message; break
    case 'cnpj': errors.cnpj = validateCnpj(form.cnpj).message; break
    case 'openingDate': errors.openingDate = validateOpeningDate(form.openingDate).message; break
    case 'phone': errors.phone = validatePhone(form.phone).message; break
    case 'password': errors.password = validatePassword(form.password).message; break
  }
}

function validateAll() {
  errors.email = validateEmail(form.email).message
  errors.phone = validatePhone(form.phone).message
  errors.password = validatePassword(form.password).message

  if (!form.accountType) {
    errors.accountType = 'Selecione o tipo de cadastro.'
  } else {
    errors.accountType = ''
  }

  if (isPF.value) {
    errors.name = validateName(form.name, 'Nome').message
    errors.cpf = validateCpf(form.cpf).message
    errors.birthDate = validateBirthDate(form.birthDate).message
  } else {
    errors.companyName = validateName(form.companyName, 'Razão social').message
    errors.cnpj = validateCnpj(form.cnpj).message
    errors.openingDate = validateOpeningDate(form.openingDate).message
  }

  return Object.values(errors).every(e => e === '')
}

function onBack() {
  router.push('/registration/password')
}

function onSubmit() {
  if (!validateAll()) return
  emit('update', { ...form })
  emit('submit')
}
</script>

<template>
  <div class="step-review">
    <div>
      <h2 class="step-review__title">Revise seus dados</h2>
      <p class="step-review__subtitle">
        Confira e ajuste as informações antes de finalizar.
      </p>
    </div>

    <div class="step-review__fields">
      <!-- Acesso -->
      <FormInput
        v-model="form.email"
        label="E-mail"
        placeholder="seu@email.com"
        type="email"
        :error="errors.email"
        :required="true"
        autocomplete="email"
        inputmode="email"
        @blur="validateField('email')"
      />

      <RadioGroup
        v-model="form.accountType"
        label="Tipo de cadastro"
        :options="ACCOUNT_TYPE_OPTIONS"
        :error="errors.accountType"
        :required="true"
      />

      <!-- PF -->
      <template v-if="isPF">
        <FormInput
          v-model="form.name"
          label="Nome completo"
          placeholder="Seu nome completo"
          :error="errors.name"
          :required="true"
          autocomplete="name"
          @blur="validateField('name')"
        />

        <div class="step-review__row">
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
      </template>

      <!-- PJ -->
      <template v-else>
        <FormInput
          v-model="form.companyName"
          label="Razão social"
          placeholder="Nome da empresa"
          :error="errors.companyName"
          :required="true"
          autocomplete="organization"
          @blur="validateField('companyName')"
        />

        <div class="step-review__row">
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
      </template>

      <!-- Telefone e senha (ambos os tipos) -->
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

      <FormInput
        v-model="form.password"
        label="Senha de acesso"
        placeholder="••••••••"
        type="password"
        :error="errors.password"
        :required="true"
        autocomplete="new-password"
        @blur="validateField('password')"
      />
    </div>

    <div v-if="submitError" class="step-review__error-banner" role="alert">
      {{ submitError }}
    </div>

    <div class="step-review__actions">
      <BaseButton variant="ghost" :disabled="loading" @click="onBack">Voltar</BaseButton>
      <BaseButton
        variant="primary"
        :loading="loading"
        :disabled="loading"
        @click="onSubmit"
      >
        Cadastrar
      </BaseButton>
    </div>
  </div>
</template>
