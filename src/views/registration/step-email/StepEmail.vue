<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import './step-email.large.css'
import './step-email.small.css'
import FormInput from '@/components/form-input/FormInput.vue'
import RadioGroup from '@/components/radio-group/RadioGroup.vue'
import BaseButton from '@/components/base-button/BaseButton.vue'
import { validateEmail } from '@/validators/validate-email.js'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update'])

const router = useRouter()

const ACCOUNT_TYPE_OPTIONS = [
  { value: 'PF', label: 'Pessoa Física' },
  { value: 'PJ', label: 'Pessoa Jurídica' }
]

const form = reactive({
  email: props.formData.email || '',
  accountType: props.formData.accountType || ''
})

const errors = reactive({
  email: '',
  accountType: ''
})

function validateForm() {
  const emailResult = validateEmail(form.email)
  errors.email = emailResult.message

  if (!form.accountType) {
    errors.accountType = 'Selecione o tipo de cadastro.'
  } else {
    errors.accountType = ''
  }

  return !errors.email && !errors.accountType
}

function onEmailBlur() {
  const result = validateEmail(form.email)
  errors.email = result.message
}

function onAccountTypeChange(value) {
  form.accountType = value
  if (value) errors.accountType = ''
}

function onContinue() {
  if (validateForm()) {
    emit('update', { email: form.email, accountType: form.accountType })
    router.push('/registration/person')
  }
}
</script>

<template>
  <div class="step-email">
    <div>
      <h2 class="step-email__title">Bem-vindo!</h2>
      <p class="step-email__subtitle">Informe seu e-mail e o tipo de cadastro para começar.</p>
    </div>

    <div class="step-email__fields">
      <FormInput
        v-model="form.email"
        label="E-mail"
        placeholder="seu@email.com"
        type="email"
        :error="errors.email"
        :required="true"
        autocomplete="email"
        inputmode="email"
        @blur="onEmailBlur"
      />

      <RadioGroup
        :model-value="form.accountType"
        label="Tipo de cadastro"
        :options="ACCOUNT_TYPE_OPTIONS"
        :error="errors.accountType"
        :required="true"
        @update:model-value="onAccountTypeChange"
      />
    </div>

    <div class="step-email__actions">
      <BaseButton variant="primary" @click="onContinue">
        Continuar
      </BaseButton>
    </div>
  </div>
</template>
