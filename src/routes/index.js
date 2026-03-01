import { createRouter, createWebHistory } from 'vue-router'
import UserRegistration from '@/views/registration/UserRegistration.vue'

const routes = [
  {
    path: '/',
    redirect: '/registration/email'
  },
  {
    path: '/registration',
    component: UserRegistration,
    children: [
      {
        path: 'email',
        name: 'registration-email',
        component: () => import('@/views/registration/step-email/StepEmail.vue')
      },
      {
        path: 'person',
        name: 'registration-person',
        component: () => import('@/views/registration/step-personal-data/StepPersonalData.vue')
      },
      {
        path: 'password',
        name: 'registration-password',
        component: () => import('@/views/registration/step-password/StepPassword.vue')
      },
      {
        path: 'review',
        name: 'registration-review',
        component: () => import('@/views/registration/step-review/StepReview.vue')
      },
      {
        path: 'success',
        name: 'registration-success',
        component: () => import('@/views/registration/success/RegistrationSuccess.vue')
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
