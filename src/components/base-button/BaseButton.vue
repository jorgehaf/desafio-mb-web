<script setup>
import './base-button.large.css'
import './base-button.small.css'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost'].includes(v)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  full: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

function onClick(event) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    class="base-button"
    :class="[
      `base-button--${variant}`,
      { 'base-button--full': full },
      { 'base-button--loading': loading }
    ]"
    :type="type"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>
