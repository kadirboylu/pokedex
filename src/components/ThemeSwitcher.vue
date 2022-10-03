<template>
  <div @click="toggleDarkMode" class="theme-switcher">
    <i v-if="darkMode" class="fas fa-moon tooltip">
      <span class="tooltiptext">Dark Mode</span>
    </i>
    <i v-else-if="lightMode" class="fa-regular fa-sun tooltip">
      <span class="tooltiptext">Light Mode</span>
    </i>
    <i v-else class="fa-solid fa-computer tooltip">
      <span class="tooltiptext">System Default</span>
    </i>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class ThemeSwitcher extends Vue {
  lightMode = document.documentElement.classList.contains("light");
  darkMode = document.documentElement.classList.contains("dark");

  toggleDarkMode(): void {
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      this.lightMode = false;
      this.darkMode = true;
    } else if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      this.darkMode = false;
      this.lightMode = true;
    } else {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("light");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-switcher {
  cursor: pointer;
  font-size: 1.5rem;
  user-select: none;
  border-radius: 50%;
  width: 2rem;
  height: 1.75rem;
  text-align: center;
  margin-left: 0.5rem;
  margin-right: 1rem;
  transition: all 0.3s ease-in-out;

  i {
    color: var(--text-color);
  }
}

.tooltip {
  position: relative;
  display: inline-block;

  &:hover .tooltiptext {
    visibility: visible;
  }
  .tooltiptext {
    visibility: hidden;
    font-family: montserrat, sans-serif;
    font-weight: 700;
    width: 120px;
    font-size: 12px;
    background-color: var(--tooltip-bg);
    opacity: 95%;
    color: var(--tooltip-color);
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 2px;
    right: 150%;
    transition: color 0.3s ease-in-out;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 100%;
      transition: color 0.3s ease-in-out;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent var(--tooltip-bg);
    }
  }
}

@media (max-width: 768px) {
  .theme-switcher {
    position: absolute;
    right: -5px;
    top: 10px;
  }

  .tooltiptext {
    display: none;
  }
}
</style>
