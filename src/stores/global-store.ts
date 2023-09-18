import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isNew: false,
  }),
  getters: {
    isOrderNew: (state) => state.isNew,
  },
  actions: {
    update(v: boolean) {
      this.isNew = v;
    },
  },
});
