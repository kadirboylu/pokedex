<template>
  <div class="favorites">
    <div v-if="groups[0]" class="groups">
      <ul class="group" v-for="group in groups" :key="group">
        <li>
          <h2 class="group-name">{{ group }}</h2>
          <FavoriteGroup :group="group" />
        </li>
      </ul>
    </div>
    <p v-else class="empty">EMPTY</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { strapiStore } from "@/store/strapi.module";
import FavoriteGroup from "../components/FavoriteGroup.vue";

@Component({
  components: {
    FavoriteGroup,
  },
})
export default class FavoritesView extends Vue {
  created() {
    if (!strapiStore.isLogin) {
      this.$router.push("/login");
    }
  }

  get groups(): string[] {
    if (strapiStore.user) {
      return strapiStore.user.groups;
    } else {
      return [];
    }
  }
}
</script>

<style lang="scss" scoped>
.favorites {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  .groups {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    .group {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      .group-name {
        font-size: 2rem;
        width: 100%;
        text-align: center;
        font-family: "Sigmar One", cursive;
        font-weight: 500;
        text-transform: capitalize;
      }
    }
  }

  .empty {
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    font-family: "Sigmar One", cursive;
    font-size: 1.5rem;
    font-weight: 500;
    opacity: 0.5;
  }
}
</style>
