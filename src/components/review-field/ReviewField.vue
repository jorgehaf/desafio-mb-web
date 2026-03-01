<script setup>
import './review-field.large.css'
import './review-field.small.css'

defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: ''
  },
  masked: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['edit'])

function onEdit() {
  emit('edit')
}
</script>

<template>
  <div class="review-field">
    <span class="review-field__label">{{ label }}</span>
    <div class="review-field__content">
      <span
        class="review-field__value"
        :class="{ 'review-field__value--masked': masked }"
      >
        {{ masked ? '••••••••' : value }}
      </span>
      <button
        v-if="editable"
        class="review-field__edit-btn"
        type="button"
        :aria-label="`Editar ${label}`"
        @click="onEdit"
      >
        Editar
      </button>
    </div>
  </div>
</template>
