<template>
  <div class="favorites">
    <h2>Favorites</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { authStore } from "@/store/auth.module";

@Component({
  components: {},
})
export default class FavoritesView extends Vue {
  created() {
    if (!authStore.isLogin) {
      this.$router.push("/login");
    }
  }
}
</script>
