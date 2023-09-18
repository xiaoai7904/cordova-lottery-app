import { computed } from 'vue';

export function useEnv() {
  const isCordova = computed(() => process.env.MODE === 'cordova');

  const isSpa = computed(() => process.env.MODE === 'spa');

  return {
    isCordova,
    isSpa,
  };
}
