<template>
  <div id="app">
    <HeaderSection />
    <div class="router">
      <router-view />
    </div>
    <FooterSection />
    <BaseToast />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import BaseToast from "./components/BaseToast.vue";

@Component({
  components: {
    HeaderSection,
    FooterSection,
    BaseToast,
  },
})
export default class App extends Vue {
  created() {
    const lang = localStorage.getItem("language") || "en";
    document.documentElement.setAttribute("lang", lang);

    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("light");
    }
  }
}
</script>

<style lang="scss" scoped>
.router {
  min-height: calc(100vh - 106px);
  padding: 1rem;
}
</style>
