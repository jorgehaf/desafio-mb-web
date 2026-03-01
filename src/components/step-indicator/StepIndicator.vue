<script setup>
import { computed } from 'vue'
import './step-indicator.large.css'
import './step-indicator.small.css'

const props = defineProps({
  steps: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    required: true // 1-based
  }
})

const totalSteps = computed(() => props.steps.length)
const currentLabel = computed(() => props.steps[props.currentStep - 1]?.label ?? '')
const fillPercent = computed(() => (props.currentStep / totalSteps.value) * 100)
</script>

<template>
  <div class="step-indicator" role="status" :aria-label="`Etapa ${currentStep} de ${totalSteps}: ${currentLabel}`">
    <div class="step-indicator__meta">
      <span class="step-indicator__label">{{ currentLabel }}</span>
      <span class="step-indicator__counter" aria-hidden="true">
        Etapa {{ currentStep }} de {{ totalSteps }}
      </span>
    </div>

    <div class="step-indicator__track" aria-hidden="true">
      <div
        class="step-indicator__fill"
        :style="{ width: `${fillPercent}%` }"
      />
    </div>
  </div>
</template>
