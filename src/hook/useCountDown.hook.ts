import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';

export function useCountDown() {
  const count = ref(0);
  const { pause, resume, isActive } = useIntervalFn(() => {
    if (count.value > 0) {
      count.value -= 1;
    } else {
      pause();
    }
  }, 1000);
  // resume: 开始倒计时
  const start = (time: number) => {
    if (count.value > 0) return;
    count.value = time;
    console.log(count);
    resume();
  };
  return {
    count,
    pause,
    resume,
    isActive,
    start,
  };
}
