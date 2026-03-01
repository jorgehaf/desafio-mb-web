<script setup>
import './registration-success.large.css'
import './registration-success.small.css'

defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="registration-success" role="status" aria-live="polite">
    <div class="registration-success__icon" aria-hidden="true">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M7 18L14 25L29 11"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <h2 class="registration-success__title">Cadastro realizado!</h2>

    <p class="registration-success__message">
      Seu cadastro foi concluído com sucesso.<br />
      <span v-if="formData.email">
        Um e-mail de confirmação foi enviado para
        <span class="registration-success__email">{{ formData.email }}</span>.
      </span>
    </p>
  </div>
</template>
