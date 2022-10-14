<template>
  <div v-if="user" class="base">
    <h2>{{ $t("page_not_found") }}</h2>
    <p>{{ $t("page_not_found_message") }}</p>
    <a href="/">{{ $t("home") }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { strapiStore } from "@/store/strapi.module";
import { User } from "@/service";

@Component({
  components: {},
})
export default class PageNotFoundView extends Vue {
  created() {
    if (!strapiStore.isLogin) {
      this.$router.push("/login");
    }
  }

  get user(): User | null {
    return strapiStore.user;
  }
}
</script>

<style lang="scss" scoped>
.base {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  a {
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: var(--color-400);

    &:hover {
      background-color: var(--color-300);
    }
  }
}
</style>
