<script setup>
import './radio-group.large.css'
import './radio-group.small.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function select(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="radio-group" role="group" :aria-label="label">
    <span
      v-if="label"
      class="radio-group__label"
      :class="{ 'radio-group__label--required': required }"
    >
      {{ label }}
    </span>

    <div class="radio-group__options">
      <label
        v-for="option in options"
        :key="option.value"
        class="radio-group__option"
        :class="{ 'radio-group__option--selected': modelValue === option.value }"
        @click="select(option.value)"
      >
        <input
          class="radio-group__native"
          type="radio"
          :name="label"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="select(option.value)"
        />
        <span class="radio-group__option-label">{{ option.label }}</span>
      </label>
    </div>

    <span class="radio-group__error" role="alert" aria-live="polite">
      {{ error }}
    </span>
  </div>
</template>
