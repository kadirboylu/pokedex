<template>
  <div class="base">
    <h2>Page not found!</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/">Home Page</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { authStore } from "@/store/auth.module";

@Component({
  components: {},
})
export default class PageNotFoundView extends Vue {
  created() {
    if (!authStore.isLogin) {
      this.$router.push("/login");
    }
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
