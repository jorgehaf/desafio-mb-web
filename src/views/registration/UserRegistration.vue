<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StepIndicator from '@/components/step-indicator/StepIndicator.vue'
import { submitRegistration } from '@/services/registration.js'

const STEPS = [
  { label: 'E-mail' },
  { label: 'Dados' },
  { label: 'Senha' },
  { label: 'Revisão' }
]

const ROUTE_TO_STEP = {
  'registration-email': 1,
  'registration-person': 2,
  'registration-password': 3,
  'registration-review': 4
}

const route = useRoute()
const router = useRouter()

const currentStep = computed(() => ROUTE_TO_STEP[route.name] ?? null)
const isRegistrationStep = computed(() => currentStep.value !== null)

const isSubmitting = ref(false)
const submitError = ref('')

const formData = reactive({
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

function onUpdate(data) {
  Object.assign(formData, data)
}

async function onSubmit() {
  if (isSubmitting.value) return

  isSubmitting.value = true
  submitError.value = ''

  try {
    await submitRegistration({ ...formData })
    router.push({ name: 'registration-success' })
  } catch (error) {
    submitError.value =
      error.message || 'Ocorreu um erro ao realizar o cadastro. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="app-layout">
    <main class="app-layout__main">
      <div class="app-layout__card">
        <div class="app-layout__brand" aria-label="MB Web">
          <span class="app-layout__brand-text">MB</span>
        </div>

        <StepIndicator
          v-if="isRegistrationStep"
          :steps="STEPS"
          :current-step="currentStep"
        />

        <div :class="isRegistrationStep ? 'app-layout__step-content' : ''">
          <RouterView v-slot="{ Component }">
            <Transition name="step-fade" mode="out-in">
              <component
                :is="Component"
                :key="route.name"
                :form-data="formData"
                :loading="isSubmitting"
                :submit-error="submitError"
                @update="onUpdate"
                @submit="onSubmit"
              />
            </Transition>
          </RouterView>
        </div>
      </div>
    </main>
  </div>
</template>
