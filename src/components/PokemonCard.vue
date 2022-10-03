d
<template>
  <div class="container">
    <div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="relative">
              <img :src="pokemon.sprites.other.home.front_default" alt="pokemon" class="pokemon-img" />
            </div>
            <h2 class="name">{{ pokemon.name }}</h2>
          </div>
          <div class="flip-card-back">
            <h3>Height</h3>
            <p>{{ pokemon.height }} Decimetres</p>
            <h3>Weight</h3>
            <p>{{ pokemon.weight }} Hectograms</p>
            <h3>Base Experience</h3>
            <p>{{ pokemon.base_experience }} XP</p>
            <a :href="`/pokemon/${pokemon.name}`">Click to see more</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PokemonResponse } from "@/service";

@Component({
  components: {},
})
export default class PokemonCard extends Vue {
  @Prop({ required: true }) pokemon!: PokemonResponse;
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

  a {
    display: block;
    margin-top: 1rem;
    width: max-content;
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

.pokemon-img {
  width: 150px;
  margin-top: 1rem;
  padding: 1rem;
  background-image: linear-gradient(to right, var(--image-color-from), var(--image-color-to));
  border-radius: 50px 0 50px 0;
}

h2,
h3 {
  margin: 0.25rem 0;
}
</style>
