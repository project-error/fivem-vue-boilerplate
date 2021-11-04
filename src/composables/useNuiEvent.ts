import { isRef, onMounted, onUnmounted, watch } from 'vue'

export default function useNuiEvent<T = unknown>(eventName: string, handler: (data: T) => void) {

  onMounted(() => window.addEventListener('message', handler))
  onUnmounted(() => window.removeEventListener('message', handler))
}
