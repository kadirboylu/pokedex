<template>
  <div>
    <SearchSection class="search-section" @search="update($event)" />
    <FiltersSection @filter="filter($event)" />
    <BaseLoader v-if="loading" />
    <div v-if="!error">
      <div>
        <TransitionGroup name="list" tag="main">
          <PokemonCard v-for="pokemon in searchResults" :key="pokemon.name" :pokemon="pokemon" />
        </TransitionGroup>
      </div>
    </div>
    <p v-else class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokemonCard from "./PokemonCard.vue";
import SearchSection from "../components/SearchSection.vue";
import BaseLoader from "./BaseLoader.vue";
import { getPokemonList, getPokemon, PokemonResponse } from "@/service";
import FiltersSection from "./FiltersSection.vue";
import { pokemonStore } from "@/store/pokemon.module";

@Component({
  components: {
    SearchSection,
    BaseLoader,
    PokemonCard,
    FiltersSection,
  },
})
export default class PokemonContainer extends Vue {
  pokemons: PokemonResponse[] = [];
  filteredPokemons: PokemonResponse[] = [];
  error = "";
  loading = false;
  query = "";

  get searchResults(): PokemonResponse[] {
    if (this.query && this.filteredPokemons[0]) {
      const name = this.filteredPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.query));
      const move = this.filteredPokemons.filter((pokemon) => pokemon.moves.some((item) => item.move.name.toLowerCase().includes(this.query)));

      const result = [...name, ...move];

      return Array.from(new Set(result));
    } else if (this.query && this.pokemons) {
      const name = this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(this.query));
      const move = this.pokemons.filter((pokemon) => pokemon.moves.some((item) => item.move.name.toLowerCase().includes(this.query)));

      const result = [...name, ...move];

      return Array.from(new Set(result));
    } else if (!this.filteredPokemons[0]) {
      return this.pokemons;
    } else {
      return this.filteredPokemons;
    }
  }

  update(value: string): void {
    this.query = value.toLocaleLowerCase();
  }

  filter(value: PokemonResponse[]): void {
    this.filteredPokemons = value;
  }

  async created() {
    try {
      this.loading = true;
      const { results } = await getPokemonList();

      let pokemonList = results;

      this.pokemons = await Promise.all(pokemonList.map((pokemon) => getPokemon(pokemon.name)));

      pokemonStore.setPokemonList(this.pokemons);
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.search-section {
  margin: 5rem 0;
}

main {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.error {
  width: 100%;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
