<script setup>
import './form-input.large.css'
import './form-input.small.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: undefined
  },
  inputmode: {
    type: String,
    default: undefined
  },
  autocomplete: {
    type: String,
    default: 'off'
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'input'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
  emit('input', event)
}

function onBlur(event) {
  emit('blur', event)
}
</script>

<template>
  <div class="form-input">
    <label
      v-if="label"
      class="form-input__label"
      :class="{ 'form-input__label--required': required }"
    >
      {{ label }}
    </label>

    <input
      class="form-input__field"
      :class="{ 'form-input__field--error': error }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      @input="onInput"
      @blur="onBlur"
    />

    <span class="form-input__error" role="alert" aria-live="polite">
      {{ error }}
    </span>
  </div>
</template>
