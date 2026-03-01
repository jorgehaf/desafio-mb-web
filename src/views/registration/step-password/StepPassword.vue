<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import './step-password.large.css'
import './step-password.small.css'
import FormInput from '@/components/form-input/FormInput.vue'
import BaseButton from '@/components/base-button/BaseButton.vue'
import { validatePassword } from '@/validators/validate-password.js'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update'])

const router = useRouter()

const form = reactive({
  password: props.formData.password || ''
})

const errors = reactive({
  password: ''
})

const showPassword = ref(false)

const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return { score: 0, label: '', level: '' }

  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[a-z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++

  if (score <= 2) return { score, label: 'Fraca', level: 'weak' }
  if (score <= 3) return { score, label: 'Razoável', level: 'fair' }
  return { score, label: 'Forte', level: 'strong' }
})

function getBarClass(index) {
  const { score, level } = passwordStrength.value
  if (index >= score) return ''
  return `step-password__strength-bar--filled-${level}`
}

function onPasswordBlur() {
  errors.password = validatePassword(form.password).message
}

function validateForm() {
  errors.password = validatePassword(form.password).message
  return !errors.password
}

function onContinue() {
  if (!validateForm()) return
  emit('update', { password: form.password })
  router.push('/registration/review')
}

function onBack() {
  router.push('/registration/person')
}
</script>

<template>
  <div class="step-password">
    <div>
      <h2 class="step-password__title">Crie sua senha</h2>
      <p class="step-password__subtitle">Escolha uma senha segura para proteger seu acesso.</p>
    </div>

    <div class="step-password__fields">
      <FormInput
        v-model="form.password"
        label="Senha de acesso"
        placeholder="Digite sua senha"
        :type="showPassword ? 'text' : 'password'"
        :error="errors.password"
        :required="true"
        autocomplete="new-password"
        @blur="onPasswordBlur"
      />

      <div v-if="form.password" class="step-password__strength">
        <div class="step-password__strength-bars" aria-hidden="true">
          <div
            v-for="i in 5"
            :key="i"
            class="step-password__strength-bar"
            :class="getBarClass(i - 1)"
          />
        </div>
        <span class="step-password__strength-label">
          Força da senha: <strong>{{ passwordStrength.label }}</strong>
        </span>
      </div>

      <div class="step-password__hint">
        <strong>Requisitos da senha:</strong>
        <ul>
          <li>Mínimo 8 caracteres</li>
          <li>Pelo menos uma letra maiúscula</li>
          <li>Pelo menos uma letra minúscula</li>
          <li>Pelo menos um número</li>
        </ul>
      </div>
    </div>

    <div class="step-password__actions">
      <BaseButton variant="ghost" @click="onBack">Voltar</BaseButton>
      <BaseButton variant="primary" @click="onContinue">Continuar</BaseButton>
    </div>
  </div>
</template>
