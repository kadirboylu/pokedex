<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
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
          <i class="close fas fa-times" @click="$emit('close')"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { PokemonResponse } from "@/service";
import { Component, Vue } from "vue-property-decorator";
import { modalStore } from "../store/modal.module";

@Component({
  components: {},
})
export default class PokemonModal extends Vue {
  pokemon: PokemonResponse = modalStore.pokemonData;
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 95%;
  min-width: 320px;
  height: 90vh;
  overflow-y: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: var(--color-400);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
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
