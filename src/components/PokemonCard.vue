<template>
  <div class="container">
    <div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="relative">
              <img :src="pokemon.sprites.other.home.front_default" alt="pokemon" class="pokemon-img" />
            </div>
            <h2 class="name" lang="en">{{ pokemon.name }}</h2>
          </div>
          <div class="flip-card-back">
            <div class="head">
              <h2 lang="en">{{ pokemon.name }}</h2>
              <GroupSelection :pokemon="pokemon" />
            </div>
            <div @mouseenter="openOptions" @mouseleave="closeOptions" class="options-wrapper">
              <button class="view-option">{{ $t("details") }}</button>
              <div v-if="showOptions" class="options">
                <a class="view-option" :href="`/pokemon/${pokemon.name}`">{{ $t("page_view") }}</a>
                <button class="view-option" @click="openModal">{{ $t("modal_view") }}</button>
                <button class="view-option" @click="openDrawer">{{ $t("drawer_view") }}</button>
              </div>
            </div>
            <h3>{{ $t("height") }}</h3>
            <p>{{ pokemon.height }} {{ $t("decimetres") }}</p>
            <h3>Weight</h3>
            <p>{{ pokemon.weight }} {{ $t("hectograms") }}</p>
            <h3>{{ $t("base_experience") }}</h3>
            <p>{{ pokemon.base_experience }} {{ $t("XP") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PokemonResponse } from "@/service";
import { pokemonStore } from "../store/pokemon.module";
import GroupSelection from "./GroupSelection.vue";

@Component({
  components: {
    GroupSelection,
  },
})
export default class PokemonCard extends Vue {
  @Prop({ required: true }) pokemon!: PokemonResponse;

  showOptions = false;

  openOptions() {
    this.showOptions = true;
  }

  closeOptions() {
    this.showOptions = false;
  }

  openModal() {
    pokemonStore.openModal(this.pokemon);
  }

  openDrawer() {
    pokemonStore.openDrawer(this.pokemon);
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  transition: all 0.3s ease-in;
  color: whitesmoke;
  user-select: none;
}

.flip-card {
  background-color: transparent;
  width: 200px;
  height: 235px;
  perspective: 1000px;
  margin: 1rem;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-image: linear-gradient(to right, var(--card-color-from), var(--card-color-to));
  border-radius: 50px 0 50px 0;
  text-align: center;
}

.flip-card-back {
  background-image: linear-gradient(to right, var(--card-color-from), var(--card-color-to));
  border-radius: 50px 0 50px 0;
  transform: rotateY(180deg);
  padding: 1rem 0 0 1.25rem;

  h2 {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
    font-family: "Sigmar One", cursive;
    text-transform: uppercase;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  h3 {
    font-size: 16px;
    margin: 0.25rem 0;
  }
}

.name {
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  font-family: "Sigmar One", cursive;
  font-weight: 500;
  font-size: 16px;
  line-height: 40px;
  text-transform: uppercase;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.head {
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.75rem;
}

.pokemon-img {
  width: 150px;
  margin-top: 1rem;
  padding: 1rem;
  background-image: linear-gradient(to right, var(--image-color-from), var(--image-color-to));
  border-radius: 50px 0 50px 0;
}

.options-wrapper {
  position: relative;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 0;

  .options {
    position: absolute;
    top: 31px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .view-option {
    width: 170px;
    text-align: center;
    padding: 0.5rem;
    border: none;
    background-color: var(--color-300);
    color: var(--text-color);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 1px solid white;
    transition: all 0.3s ease-in;

    &:hover {
      color: var(--color-50);
    }
  }
}
</style>
