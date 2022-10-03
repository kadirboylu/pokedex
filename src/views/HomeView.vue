<template>
  <div class="home-view">
    <div class="home-logo">
      <img src="@/assets/image/pokedex.webp" alt="logo" class="img-pokedex" />
      <img src="@/assets/image/pokeball.webp" alt="logo" class="img-pokeball animate-spin" />
    </div>
    <div class="pokemon-list">
      <PokemonContainer />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonContainer from "../components/PokemonContainer.vue";

@Component({
  components: {
    PokemonContainer,
  },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.home-logo {
  position: relative;
  display: flex;
  width: 320px;
  margin: auto;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;

  .img-pokedex {
    width: 320px;
  }

  .img-pokeball {
    position: absolute;
    width: 63px;
    left: 40px;
    top: 1px;
  }
}

.pokemon-list,
.search-results {
  margin-top: 2rem;
}
</style>
