export const useThemeStore = defineStore(
  "ThemeStore",
  () => {
    const dark = ref(true);

    return { dark };
  },
  { persist: true }
);