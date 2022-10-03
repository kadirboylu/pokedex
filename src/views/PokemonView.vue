<template>
  <div class="pokemon">
    <BaseLoader v-if="loading" />
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else class="details-wrapper">
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseLoader from "@/components/BaseLoader.vue";
import { getPokemon, PokemonResponse } from "@/service";

@Component({
  components: {
    BaseLoader,
  },
})
export default class PokemonView extends Vue {
  pokemon: PokemonResponse = {
    name: "",
    id: 0,
    weight: 0,
    height: 0,
    base_experience: 0,
    sprites: {
      other: {
        home: {
          front_default: "",
        },
      },
    },
    types: [],
    abilities: [],
    moves: [],
  };
  loading = false;
  error = "";

  async created() {
    let name: string = this.$route.params.name;

    if (!name) {
      this.$router.push({ name: "Home" });
    }

    try {
      this.loading = true;
      this.pokemon = await getPokemon(name);
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
.details-wrapper {
  width: 50%;
  min-width: 300px;
  margin: 0 auto;
  padding-top: 40px;
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

.error {
  width: 50%;
  min-width: 300px;
  margin: 0 auto;
  padding-top: 40px;
  user-select: none;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
}
</style>
