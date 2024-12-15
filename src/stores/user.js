import { defineStore } from 'pinia'

export const useUserStore = defineStore('token', () => {
  const token = localStorage.getItem('token')
  return { token }
})
