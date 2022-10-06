<template>
  <div class="wrapper" :class="{ show: showDrawer }">
    <div class="drawer">
      <div class="pokemon">
        <div class="details-wrapper">
          <img :src="pokemon.sprites.other.home.front_default" alt="pokemon-img " class="poke-img animate-bounce" />
          <h2 class="poke-name">{{ pokemon.name }}</h2>
          <h2 class="stat-heading">stats</h2>
          <div class="stats-wrapper">
            <div>
              <p class="height"><span>Height: </span>{{ pokemon.height }} Decimetres</p>
              <p class="weight"><span>Weight: </span>{{ pokemon.weight }} Hectograms</p>
            </div>
          </div>
          <h2 class="stat-heading">types</h2>
          <ul>
            <li v-for="item in pokemon.types" :key="item.slot" class="stat-box">
              {{ item.type.name }}
            </li>
          </ul>
          <h2 class="stat-heading">abilities</h2>
          <ul>
            <li v-for="item in pokemon.abilities" :key="item.slot" class="stat-box">
              {{ item.ability.name }}
            </li>
          </ul>
          <h2 class="stat-heading">moves</h2>
          <ul>
            <li v-for="item in pokemon.moves" :key="item.move.name" class="stat-box">
              {{ item.move.name }}
            </li>
          </ul>
        </div>
      </div>
      <i class="close fas fa-times" @click="closeDrawer"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { PokemonResponse } from "@/service";
import { Component, Vue } from "vue-property-decorator";
import { pokemonStore } from "../store/pokemon.module";

@Component
export default class PokemonDrawer extends Vue {
  get pokemon(): PokemonResponse {
    return pokemonStore.pokemonData;
  }

  get showDrawer(): boolean {
    return pokemonStore.showDrawer;
  }

  closeDrawer() {
    pokemonStore.closeDrawer();
  }

  outsideClick(e: MouseEvent) {
    if (e.target === this.$el) {
      pokemonStore.closeDrawer();
    }
  }

  mounted() {
    document.addEventListener("click", this.outsideClick);
  }

  beforeDestroy() {
    document.removeEventListener("click", this.outsideClick);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: -5000px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: all 0.2s ease-in-out;

  .drawer {
    position: relative;
    overflow: auto;
    width: 40%;
    min-width: 320px;
    height: 100vh;
    background-color: var(--color-400);
    padding: 1rem;
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
}

.show {
  left: 0;
}
.details-wrapper {
  margin: 0 auto;
  padding-top: 60px;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  .poke-img {
    width: 180px;
  }

  .poke-name,
  .stat-heading {
    font-size: 2rem;
    text-transform: uppercase;
    font-family: "Sigmar One", cursive;
    font-weight: 500;
    margin: 0.25rem;
  }

  .stat-heading {
    font-size: 1.5rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1;
      min-width: fit-content;
      text-align: center;
      border: 1px solid var(--text-color);
    }
  }

  .stat-box {
    background-color: var(--color-300);
    color: var(--text-color);
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.25rem;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }

  .height,
  .weight {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0.25rem;

    span {
      font-weight: 700;
    }
  }
}
</style>
