<template>
  <header>
    <button @click="toggleDropdown" class="menu-button" :class="{ 'fas fa-bars': !showMenu, 'fas fa-times': showMenu }"></button>
    <a href="/" class="header-logo">
      <img alt="pokeball" src="@/assets/image/pokeball.webp" />
      <h1>POKEDEX!</h1>
    </a>
    <nav :class="{ show: showMenu }">
      <a href="/">{{ $t("home") }}</a>
      <a href="/favorites">{{ $t("favorites") }}</a>
      <a v-if="!isLoggedIn" href="/login">{{ $t("log_in") }}</a>
      <a v-if="!isLoggedIn" href="/signup">{{ $t("sign_up") }}</a>
      <div v-if="isLoggedIn" class="user">
        <img :src="profilePicture" alt="profile-picture" />
        <p class="username">{{ username }}</p>
      </div>
      <button
        v-if="isLoggedIn"
        class="logout"
        @click="
          logout();
          closeDropdown();
        "
      >
        {{ $t("log_out") }}
      </button>
      <LanguageSelection />
      <ThemeSwitcher />
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import { strapiStore } from "@/store/strapi.module";
import LanguageSelection from "./LanguageSelection.vue";

@Component({
  components: {
    ThemeSwitcher,
    LanguageSelection,
  },
})
export default class HeaderSection extends Vue {
  showMenu = false;

  toggleDropdown(): boolean {
    return (this.showMenu = !this.showMenu);
  }

  closeDropdown(): boolean {
    return (this.showMenu = false);
  }

  logout() {
    strapiStore.logout();
    this.$router.push("/login");
  }

  get isLoggedIn(): boolean {
    return strapiStore.isLogin;
  }

  get username(): string {
    return strapiStore.user?.username || "";
  }

  get profilePicture(): string {
    return strapiStore.user?.profilePicture || "";
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: var(--color-400);
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  user-select: none;
  transition: all 0.3s ease-in-out;
}

.header-logo {
  display: flex;
  align-items: center;
  margin-right: auto;

  img {
    width: 50px;
    margin: 0 0.25rem;
  }

  h1 {
    font-family: "Sigmar One", cursive;
  }
}

nav {
  display: flex;
  align-items: center;
  background-color: transparent;

  a {
    margin: 0 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 60%;
    }
  }

  .user {
    display: flex;
    align-items: center;
    margin: 0 0.75rem;

    img {
      max-height: 50px;
      margin-right: 1rem;
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
    }
    .username {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .logout {
    background-color: red;
    border: none;
    border-radius: 5px;
    margin: 0 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    font-family: "montserrat", sans-serif;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 0.85;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.menu-button {
  display: none;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  border: none;
  background-color: transparent;
  width: 30px;
  color: var(--text-color);
  cursor: pointer;
}

@media (max-width: 1000px) {
  nav {
    position: absolute;
    top: 66px;
    left: -1000px;
    background-color: var(--color-300);
    width: 100%;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 5;
    transition: all 0.3s ease-in-out;

    a,
    .user,
    .logout {
      margin: 1rem;
    }
  }

  .menu-button {
    display: block;
  }

  .show {
    left: 0;
  }
}
</style>
