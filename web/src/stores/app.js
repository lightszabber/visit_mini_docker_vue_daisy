import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    theme: "corporate"
  }),
  actions: {
    setTheme(t) {
      this.theme = t;
      document.documentElement.setAttribute("data-theme", t);
    }
  }
});
