<template>
  <select v-model="activeLanguage" @change="handleChange($event)">
    <option v-for="language in languages" :key="language.code" :value="language.code">
      {{ language.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { toastStore } from "@/store/toast.module";

@Component
export default class LanguageSelection extends Vue {
  languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "tr",
      name: "Türkçe",
    },
  ];
  activeLanguage: string = localStorage.getItem("language") || "en";

  handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.$i18n.locale = target.value;
    document.documentElement.setAttribute("lang", target.value);
    localStorage.setItem("language", target.value);

    toastStore.createToast({
      message: this.$i18n.t("toast.language.language_changed").toString(),
      type: "success",
    });
  }
}
</script>

<style lang="scss" scoped>
select {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.4rem;
  margin: 0 0.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  gap: 0.5rem;
  border-radius: 5px;

  option {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 1rem;
  }
}

@media (max-width: 1000px) {
  select {
    margin: 0.5rem 1rem;
  }
}
</style>
